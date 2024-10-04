import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// load dayjs plugins
dayjs.extend(utc);
dayjs.extend(tz);

export class JST {
	protected date: Dayjs;

	constructor(date?: string | number) {
		this.date = dayjs.tz(date, "Asia/Tokyo");
	}

	getYear(): number {
		return this.date.year();
	}

	getMonth(): number {
		return this.date.month() + 1;
	}

	getDay(): number {
		return this.date.date();
	}

	getHours(): number {
		return this.date.hour();
	}

	getMinutes(): number {
		return this.date.minute();
	}

	getSeconds(): number {
		return this.date.second();
	}

	getMilliSeconds(): number {
		return this.date.millisecond();
	}

	format(template?: string): string {
		return this.date.format(template);
	}

	toString(): string {
		return this.format("YYYY/MM/DD HH:mm:ss");
	}
}
