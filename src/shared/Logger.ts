import { JST } from "./JST";

export class Logger {
	public name: string;

	private parent: Logger | null;

	constructor(private options: LoggerOptions) {
		this.name = options.name;
		this.parent = this.options.parent ?? null;
	}

	public createChild(name: string) {
		return new Logger({ name, parent: this });
	}

	public debug(...messages: string[]) {
		this.log("DEBUG", messages);
	}

	public info(...messages: string[]) {
		this.log("INFO", messages);
	}

	public err(...messages: string[]) {
		this.log("ERROR", messages);
	}

	private log(level: LogLevel, messages: string[]) {
		const message = this.makeMessage(level, messages);
		console.log(message);
	}

	private makeMessage(level: LogLevel, messages: string[]) {
		const parents: Logger[] = [];
		let child: Logger = this;

		while (child.parent) {
			parents.unshift(child.parent);
			child = child.parent;
		}

		return `[${new JST().toString()} JST] [${[...parents, this].map((l) => l.name).join("/")}] [${level.toUpperCase()}] ${messages.join(" ")}`; // "[2024/10/04 08:19 JST] [Parent/Child] [INFO] Log message"
	}
}

export interface LoggerOptions {
	name: string;
	parent?: Logger;
}

type LogLevel = "INFO" | "ERROR" | "DEBUG";
