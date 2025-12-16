import { Column, Entity } from "typeorm";
import { pgTimestampDefaults } from "../util/typeorm-utils";

@Entity("burn_link")
export class BurnLinkEntity {
  @Column("integer", { primary: true })
  id: number;

  @Column("character varying")
  message: string;

  @Column({ ...pgTimestampDefaults })
  created: Date;

  @Column({ ...pgTimestampDefaults, nullable: true })
  expires?: Date | null;

  static builder(args: Partial<Pick<BurnLinkEntity, keyof BurnLinkEntity>>): BurnLinkEntity {
    return Object.assign(new BurnLinkEntity(), args);
  }
}
