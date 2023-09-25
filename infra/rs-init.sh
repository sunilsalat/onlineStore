#!/bin/bash

mongosh <<EOF
var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongo-product:27017",
            "priority": 1
        },
    ]
};
rs.initiate(config, { force: true });
rs.status();
EOF