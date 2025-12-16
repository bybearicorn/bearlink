import * as pg from "pg";

// https://github.com/typeorm/typeorm/issues/9627
pg.defaults.parseInputDatesAsUTC = true;
pg.types.setTypeParser(pg.types.builtins.TIMESTAMP, (val: string) => new Date(`${val}Z`));
pg.types.setTypeParser(pg.types.builtins.TIMESTAMPTZ, (val: string) => new Date(`${val}Z`));
pg.types.setTypeParser(pg.types.builtins.DATE, (val: string) => val);
