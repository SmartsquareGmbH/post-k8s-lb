const core = require("@actions/core")
// const {getInput, setFailed} = require("@actions/core")
// const {context} = require("@actions/github")

async function main() {
    core.info("Fetching packages")
}

main()
    .then()
    .catch((error) => setFailed(error.message))
