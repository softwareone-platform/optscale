#!/usr/bin/env bash

set -euo pipefail

print_help() {
    cat <<EOF
usage: $0 [x86|arm] <command> [<args>...]

Available commands:
    info             show vm status and info
    optscale-info    show optscale cluster info - frontend URL, cluster health etc.
    start, up        start the vm
    stop, down       stop the vm  (use --force to stop it immediately, potentially losing data)
    destroy          destroy the vm
    restart          stop and start the vm
    reset            destroy and start the vm
    ssh              ssh into the vm
    playbook         run an ansible playbook (pass playbook name as arg)
    role             run an ansible role (pass role name as arg)
    deploy-service   deploy a service inside the vm (pass service name as arg)
    --help, -h       show this help message

see also \`documentation/setup_dev_vm.md\` for more detailed guide on how to use this script
EOF
}

# check if --help or -h is passed as any argument regardless of its position
if [[ "$@" == *"--help"* || "$@" == *"-h"* ]]; then
    print_help
    exit 0
fi

if [[ $# -lt 1 ]]; then
    echo "Error: Invalid number of arguments."
    print_help
    exit 1
fi

if [[ "$1" == "x86" || "$1" == "arm" ]]; then
    if [[ $# -lt 2 ]]; then
        echo "Error: Invalid number of arguments, missing command."
        print_help
        exit 1
    fi
    VM_ARCH="$1"
    shift
else
    host_os_arch=$(uname -m)
    
    if [[ "$host_os_arch" == "x86_64" || "$host_os_arch" == "amd64" ]]; then
        VM_ARCH="x86"
    elif [[ "$host_os_arch" == "aarch64" || "$host_os_arch" == "arm64" ]]; then
        VM_ARCH="arm"
    else
        echo "Error: Unsupported host architecture: $host_os_arch, you need to specify the VM architecture explicitly (x86 or arm)."
        print_help
        exit 1
    fi

    echo "VM architecture not provided, using the same as host: $VM_ARCH"
fi

COMMAND="$1"
shift

if [[ "$VM_ARCH" == "x86" ]]; then
    VM_NAME="ubuntu-2404-x86-64"
elif [[ "$VM_ARCH" == "arm" ]]; then
    VM_NAME="ubuntu-2404-arm-64"
else
    echo "Error: Invalid VM architecture: $VM_ARCH, expected 'x86' or 'arm'."
    print_help
    exit 1
fi

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
INVENTORY_FILE="$SCRIPT_DIR/ansible/inventories/vm-$VM_ARCH.yaml"

function _venv_run {
    if [[ -n "${VIRTUAL_ENV:-}" ]]; then
        # A virtual environment is activated, so we can just run the command in it
        exec "$@"
    elif type uv 2>&1 > /dev/null; then
        # if uv is installed, just use it to run the command in the venv
        # (it works even if the project isn't managed by uv)
        uv run --directory "$SCRIPT_DIR" "$@"
    else
        # If no virtual environment is activated, we'll try to use the one in optscale-deploy/.venv (if exists)
        default_venv_dir="$SCRIPT_DIR/.venv"
        
        if [[ ! -d "$default_venv_dir" ]]; then
            echo "Error: no activated Virtual environment and '$default_venv_dir' doesn't exist."
            echo "Please activate the Virtual environment or create it with 'python -m venv $default_venv_dir' and try again"
            exit 1
        fi
        
        exec "$default_venv_dir/bin/$@"
    fi
}

function vm_info {
    vm_state=$(vagrant status $VM_NAME --machine-readable | grep ',state,' | cut -d ',' -f '4' )
    vm_qemu_id=$(cat ".vagrant/machines/$VM_NAME/qemu/id" 2> /dev/null || echo "")
    vm_vagrant_id=$(cat ".vagrant/machines/$VM_NAME/qemu/index_uuid" 2> /dev/null || echo "")

    # shellcheck disable=2009
    vm_process_info=$(ps -eo pid,command \
                      | grep "qemu-system-.*$VM_NAME" \
                      | grep -v "grep" \
                      || echo "")

    
    vm_qemu_pid=$(echo "$vm_process_info" | cut -d ' ' -f '1' || echo "")

    # shellcheck disable=2001
    vm_qemu_accelerator=$(echo "$vm_process_info" \
                          | sed 's/.*\-accel \([^ ]*\).*/\1/' \
                          || echo "")
    
    echo "Name:             ${VM_NAME}"
    echo "State:            ${vm_state:-unknown}"
    echo "QEMU Machine ID:  ${vm_qemu_id:-N/A}"
    echo "Vagrant ID:       ${vm_vagrant_id:-N/A}"
    echo "QEMU Process ID:  ${vm_qemu_pid:-N/A}"
    echo "QEMU Accelerator: ${vm_qemu_accelerator:-N/A}"
}

function vm_start {
    vagrant up $VM_NAME
}

function vm_stop {
    # shellcheck disable=2068
    vagrant halt $VM_NAME $@

    # if the --force flag is used, we can kill the vm process immediately as vagrant / qemu takes a while to stop the VM
    # even when --force is used
    if [[ "$@" == *"--force"* ]]; then
        vm_process_info=$(ps -eo pid,command \
                        | grep "qemu-system-.*$VM_NAME" \
                        | grep -v "grep" \
                        || echo "")

        
        vm_qemu_pid=$(echo "$vm_process_info" | cut -d ' ' -f '1' || echo "")

        if [[ -n "$vm_qemu_pid" ]]; then
            kill "$vm_qemu_pid"
        fi
    fi
    
    # After the vagrant halt often the VM is still running in the background
    # It should stop automatically eventually but if we don't wait for it and run another
    # command on the same VM, it will lead to an error which is hard to debug. Thank you, Vagrant >:(
    # shellcheck disable=2009
    while ps -eo command | grep "qemu-system-.*$VM_NAME" | grep -vq "grep"; do
        echo "$(date +%X) - Waiting until VM has stopped"
        sleep 1
    done
}

function vm_destroy {
    vm_stop --force
    vagrant destroy --force $VM_NAME
}

function vm_ssh {
    # Some terminals (such as Kitty) have set $TERM to a value which is not always recognised on remote
    # machines by default. `ssh` uses the host's $TERM and passes it to the shell session, so if the
    # remote doesn't recognise it, the $TERM functionality is not applied properly, e.g. color output.
    # In these cases we can just set it to 'xterm-256color' which is widely recognised and provides similar,
    # albeit more limitted, color support

    cmd_to_run="${1:-/bin/bash}"

    if [[ "$TERM" == "xterm-kitty" ]]; then
        TERM="xterm-256color" vagrant ssh $VM_NAME -c "$cmd_to_run"
    else
        vagrant vagrant ssh $VM_NAME -c "$cmd_to_run"
    fi
}

function vm_run_ansible_playbook {
    local playbook="$1"
    shift
    
    if [[ -f "$playbook" && ("${playbook##*.}" == "yaml" || "${playbook##*.}" == "yml") ]]; then
        playbook_path="$playbook"
    elif [[ -f "$SCRIPT_DIR/ansible/$playbook" ]]; then
        playbook_path="$SCRIPT_DIR/ansible/$playbook"
    elif [[ -f "$SCRIPT_DIR/ansible/$playbook.yaml" ]]; then
        playbook_path="$SCRIPT_DIR/ansible/$playbook.yaml"
    else
        available_playbooks=$(find "$SCRIPT_DIR/ansible" -name "*.yaml" -maxdepth 1 -exec basename {} .yaml ';' | sort)
        
        echo "Error: playbook '$playbook' not found."
        echo "Available playbooks:"
        echo "$available_playbooks"
        exit 1
    fi
    
    # shellcheck disable=2068
    _venv_run ansible-playbook --inventory-file "$INVENTORY_FILE" "$playbook_path" $@
}

function vm_run_ansible_role {
    local role="$1"
    shift
    
    if [[ -d "$role" ]]; then
        role_path="$role"
    elif [[ -d "$SCRIPT_DIR/ansible/roles/$role" ]]; then
        role_path="$SCRIPT_DIR/ansible/roles/$role"
    else
        available_roles=$(find "$SCRIPT_DIR/ansible/roles" -mindepth 1 -maxdepth 1 -type d -exec basename {} ';' | sort)
        
        echo "Error: role '$role' not found."
        echo "Available roles:"
        echo "$available_roles"
        exit 1
    fi
    
    # shellcheck disable=2068
    _venv_run ansible all \
        --inventory-file "$INVENTORY_FILE" \
        --module-name include_role \
        --args "name=$role_path" \
        $@
}

function vm_show_optscale_info {
    cluster_secret=$(vm_ssh "kubectl get secret cluster-secret -o jsonpath='{.data.cluster_secret}' | base64 --decode")
    cluster_ip_addr=$(vm_ssh "kubectl get services --no-headers --field-selector metadata.name=ngingress-nginx-ingress-controller -o custom-columns=ClusterIP:.spec.clusterIP")
    forwarded_https_port=$(cat "$SCRIPT_DIR/Vagrantfile" \
        | grep 'define_vm' -A 10 \
        | grep "name.*$VM_NAME" -A 10 \
        | grep "https: \(\d\+\)" -m 1 -o \
        | awk '{print $2}'
    )
      
    frontend_url="https://localhost:$forwarded_https_port/"
    status_code=$(curl --insecure -L -I -X GET "$frontend_url" -sw '%{http_code}\n' -o /dev/null)
    echo "Frontend URL: $frontend_url [HTTP Status: $status_code]"
    echo "Cluster IP Address: $cluster_ip_addr"
    echo "Cluster Secret: $cluster_secret"

    # ref: https://blog.cubieserver.de/2021/list-all-failed-pods-in-a-namespace-with-kubectl/
    failing_pods=$(vm_ssh "kubectl get pods -o custom-columns="POD:metadata.name,STATE:status.containerStatuses[*].state.waiting.reason" | grep -v '<none>'")
    echo
    echo "Failing Pods"
    echo "-----------"
    echo
    echo "$failing_pods"
}

function vm_deploy_service {
    local service_name="$1"

    if [[ -z "$service_name" ]]; then
        echo "Error: Service name is required."
        exit 1
    fi

    vagrant rsync "$VM_NAME"
    vm_ssh "cd optscale && ./build.sh --use-nerdctl $service_name local"
    # NOTE: optscale/optscale-deploy/.venv will always exist on the VM (even if the hosts' venv is installed elsewhere)
    #       since it was installed there during the provisioning process
    vm_ssh "cd optscale/optscale-deploy && .venv/bin/python runkube.py --no-pull -o 'overlay/user_template.yml' -- optscale local"
}


case $COMMAND in
    info)
        vm_info
        ;;
    optscale-info)
        vm_show_optscale_info
        ;;
    start|up)
        vm_start
        ;;
    stop|down)
        vm_stop "$@"
        ;;
    destroy)
        vm_destroy
        ;;
    restart)
        vm_stop
        vm_start
        ;;
    reset)
        vm_destroy
        vm_start
        ;;
    ssh)
        vm_ssh "$@"
        ;;
    playbook)
        vm_run_ansible_playbook "$@"
        ;;
    role)
        vm_run_ansible_role "$@"
        ;;
    deploy-service)
        vm_deploy_service "$@"
        ;;
    *)
        echo "Error: Invalid command: $COMMAND"
        print_help
        exit 1
        ;;
esac
