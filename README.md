# design-training

## Check design

### Code maat

[Doc](https://github.com/adamtornhill/code-maat?tab=readme-ov-file)

Install
```shell
wget -O ./code-maat.jar  https://github.com/adamtornhill/code-maat/releases/download/v1.0.2/code-maat-1.0.2-standalone.jar
java  -jar code-maat.jar
mv code-maat.jar ~/bin/code-maat.jar
alias code-maat="java -Xmx1024m -jar ~/bin/code-maat.jar"
code-maat
```

Extract data (excluding)
```shell
export FROM_DATE=2023-01-01
# For monorepos
export DIRECTORY="./api"
git log --all --numstat --date=short --pretty=format:'--%h--%ad--%aN' --no-renames --after=$FROM_DATE -- $DIRECTORY ":(exclude)src/main/resources/static/dsfr*/*" ":(exclude)build/*" > logfile.log
head logfile.log
```

Test analysis
```shell
export VERSION_CONTROL=git2
code-maat --log logfile.log --version-control $VERSION_CONTROL --rows 10
```

Generate analysis
```     
code-maat --log logfile.log --version-control $VERSION_CONTROL > analysis.txt
code-maat --log logfile.log --version-control $VERSION_CONTROL --analysis summary > summary.csv     
code-maat --log logfile.log --version-control $VERSION_CONTROL --analysis coupling > coupling.csv     
code-maat --log logfile.log --version-control $VERSION_CONTROL --analysis age > age.csv     
code-maat --log logfile.log --version-control $VERSION_CONTROL --analysis abs-churn > churn.csv     
code-maat --log logfile.log --version-control $VERSION_CONTROL --analysis author-churn > churn-by-author.csv     
code-maat --log logfile.log --version-control $VERSION_CONTROL --analysis entity-ownership > entity-ownership.csv     
code-maat --log logfile.log --version-control $VERSION_CONTROL --analysis entity-effort > entity-effort.csv
```

#### Generate with mapping

Create mapping
```shell
touch boundaries.txt
```

Add mapping in `boundaries.txt` file
```text
src/test => tests
src/main => implementation
doc => documentation
sql => database
```

Generate
```shell
java -jar code-maat.jar --log logfile.log --version-control $VERSION_CONTROL --group boundaries.txt > analysis.txt
```

Will give
```text
entity,author,added,deleted
database,mary,2,24
database,john,14,10
documentation,john,1,1
```

#### Pix

```shell
export FROM_DATE=2023-01-01
# For monorepos
export DIRECTORY="./api"
git log --all --numstat --date=short --pretty=format:'--%h--%ad--%aN' --no-renames --after=$FROM_DATE -- $DIRECTORY    ":(exclude)api/node_modules/*" ":(exclude)api/tests/*"  ":(exclude)api/translations/*" > logfile.log
head logfile.log
```

Sample `boundaries.txt` file
```text
api/db => migration
api/src => implementation
api/lib => implementation
```

Generate
```shell
export VERSION_CONTROL=git2
export LOG_FILE=logfile.log
code-maat --log $LOG_FILE --version-control $VERSION_CONTROL > analysis.txt
code-maat --log $LOG_FILE --version-control $VERSION_CONTROL --group boundaries.txt > analysis.txt
code-maat --log $LOG_FILE --version-control $VERSION_CONTROL --analysis author-churn > churn-by-author.csv
```

Create body
```shell
body() {
    IFS= read -r header
    printf '%s\n' "$header"
    "$@"
}
```

Get most commits
```shell
cat churn-by-author.csv | body sort --field-separator=',' --numeric-sort -k4 --reverse | head
```

Results
```text
author,added,deleted,commits
Matthias FERRAINA,302017,313473,754
Ismael Gorissen,20646,15307,702
Andreia Pena,563659,545259,643
```