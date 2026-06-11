const { exec } = require("node:child_process");
let count = 0;

function checkPostgres() {
  exec("docker exec postgres-estd pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      count++;
      if (count % 2 == 0) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("\033[33m◼◻◻◻◻◻◻◻◻◻ \033[0m");
      }
      if (count % 2 !== 0) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("\033[33m◼◼◻◻◻◻◻◻◻◻ \033[0m");
      }
      checkPostgres();
      return;
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("\033[33m◼◼◼◼◼◼◼◼◼◼\033[0m");
    setTimeout(() => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      console.log("\033[32m◼◼◼◼◼◼◼◼◼◼\n\nPOSTGRES ON\n\033[0m");
    }, 1000);
  }
}

console.log("\033[33m!⚠WAITING FOR POSTGRES⚠!\n\033[0m");
checkPostgres();
