sed -i.bak "s/\"dependencies\":/\"exports\":{\n     \".\":{\"node\":\".\/main.cjs\",\"default\":\".\/index.js\"},\n    \".\/link\/error\":{\"node\":\".\/link\/error\/error.cjs\",\"default\":\".\/link\/error\/index.js\"},\n    \".\/link\/core\":{\"node\":\".\/link\/core\/core.cjs\",\"default\":\".\/link\/core\/index.js\"},\n        \".\/link\/batch-http\":{\"node\":\".\/link\/batch-http\/batch-http.cjs\",\"default\":\".\/link\/batch-http\/index.js\"},\n             \".\/core\":{\"node\":\".\/core\/core.cjs\",\"default\":\".\/core\/index.js\"},\n     \".\/link\/http\":{\"node\":\".\/link\/http\/http.cjs\",\"default\":\".\/link\/http\/index.js\"},\n     \".\/package.json\": \".\/package.json\"\n},\n      \"dependencies\":/" node_modules/@apollo/client/package.json



