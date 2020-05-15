export class Logger {
    static info(message, context) {
        window.console.log(`[info]: ${message}`, context);
    }

    static error(message, context) {
        window.console.log(`[error]: ${message}`, context);
    }

    static debug(message, context) {
        window.console.log(`[debug]: ${message}`, context);
    }

    static debugger() {
        debugger;
    }
}
