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
        process.stdout.write("\x1b[33m◼◻◻◻◻◻◻◻◻◻ \x1b[0m");
      }
      if (count % 2 !== 0) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("\x1b[33m◼◼◻◻◻◻◻◻◻◻ \x1b[0m");
      }
      checkPostgres();
      return;
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("\x1b[33m◼◼◼◼◼◼◼◼◼◼\x1b[0m");
    setTimeout(() => {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      console.log("\x1b[32m◼◼◼◼◼◼◼◼◼◼\n\nPOSTGRES ON\n\x1b[0m");
    }, 1000);
  }
}

console.log("\x1b[33m!⚠WAITING FOR POSTGRES⚠!\n\x1b[0m");
checkPostgres();
