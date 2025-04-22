#!/usr/bin/env bash

#ELK_IP=elkservice.default.svc.cluster.local
#LOG_SIZE_MAX=5120
LOG_SIZE_MAX=$HX_ELK_LOG_MAX_SIZE
ELK_IP=$HX_ELK_URL
ELK_PORT=$HX_ELK_PORT

echo "ELK address="$ELK_IP
echo "ELK log max size="$LOG_SIZE_MAX

get_size_of_logs() {
	total_log_size=$(curl -s -X GET $1":"$ELK_PORT"/_stats/store" | jq '._all.total.store.size_in_bytes')
	total_log_size=$((total_log_size / 1024 / 1024))
	echo $total_log_size
}

remove_line_from_filebeat() {
	cat filebeat.txt | sort > filebeat.tmp
	tail -n +2 filebeat.tmp | sort --reverse > filebeat.txt
}

remove_index_from_elk() {
	echo "DELETING "$2" INDEX FROM ELK"
	curl -s -X DELETE $1':'$ELK_PORT'/'$2
}

m_total_log_size=$(get_size_of_logs $ELK_IP)
echo "TOTAL SIZE OF LOGS="$m_total_log_size"Mb"
if [ $m_total_log_size -lt $LOG_SIZE_MAX ]; then
	echo "SIZE OF LOGS LOWER "$LOG_SIZE_MAX"Mb -> Exit 0"
	exit 0
fi

echo "SIZE OF LOGS BIGGER "$LOG_SIZE_MAX"Mb -> START TO REMOVE LOGS"
curl -s -X GET "$ELK_IP:$ELK_PORT/_cat/indices?v" > curl_test.txt
cat curl_test.txt | awk '/filebeat/ { print $3 }' | sort --reverse > filebeat.txt

while [ $m_total_log_size -gt $LOG_SIZE_MAX ]; do
	m_filebeat=$(tail -n -1 filebeat.txt)
	filebeat_date=$(echo $m_filebeat | awk -F '-' '{ print $2 }')

	if [ "$m_filebeat" = "" ] ; then
		break
	else
	  remove_index_from_elk $ELK_IP $m_filebeat
	  remove_line_from_filebeat
	fi

	m_total_log_size=$(get_size_of_logs $ELK_IP)
	echo "NEW TOTAL SIZE OF LOGS="$m_total_log_size"Mb"
done
echo "Done"
