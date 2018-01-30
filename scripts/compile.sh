#!/bin/bash

# include parse_yaml function
. scripts/parse_yaml.sh

npm run build
gulp

ls
ls scaffolds
cp -r scaffolds/* out/
cd out
ls
git add --all .
for D in *; do
    if [ -d "${D}" ]; then
        if [ "$D" = "static" ]; then
            echo "escaped static folder."
            continue
        fi
        echo "start to check ${D}"
        git status --porcelain
        if [ $(git status --porcelain | grep "${D}/index.yml" | wc -l) -lt 1 ]; then
            echo "No changes to the output on scaffold ${D}; exiting."
            git reset -- $D && git checkout $D
            git status --porcelain
            continue
        fi
        cd $D

        eval $(parse_yaml index.yml "config_")
        REPO=$(echo ${config_git_url} | sed "s/'//g")

        git clone $REPO _temp --depth=1

        echo "try to build scaffold ${D} at ${REPO}"
        cd _temp
        npm install
        npm run build
        if [ -d dist ]; then
          cp -r dist/* ../
        fi
        if [ -d build ]; then
          cp -r build/* ../
        fi
        cd ..
        rm -rf _temp
        # replace index.html absolute static paths
        # like https://github.com/zuiidea/antd-admin
        sed -i -- 's/src="\//src="/g' index.html
        sed -i -- 's/href="\//href="/g' index.html
        cd ..
    fi
done

cd ..
