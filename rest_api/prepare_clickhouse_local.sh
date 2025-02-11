#!/bin/bash
set -e
CLICKHOUSE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &> /dev/null && pwd)/.clickhouse"
CLICKHOUSE_BIN="$CLICKHOUSE_DIR/clickhouse"

if [ ! -f $CLICKHOUSE_BIN ]; then
    echo "Preparing clickhouse for local use"
    mkdir -p $CLICKHOUSE_DIR
    cd $CLICKHOUSE_DIR && curl https://clickhouse.com/ | sh
    chmod +x $CLICKHOUSE_BIN
    echo "Complete"
else
  echo "Сlickhouse binary ($CLICKHOUSE_BIN) already exists"
fi
