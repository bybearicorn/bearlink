import { random } from "lodash";
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";

import { BurnLinkEntity } from "../entities/burn-link.entity";

const entityClasses = [
  BurnLinkEntity,
];
type EntityType = InstanceType<(typeof entityClasses)[number]>;

@EventSubscriber()
export class BeforeInsertSubscriber implements EntitySubscriberInterface {
  public async beforeInsert(event: InsertEvent<EntityType>) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- any is safe here, no better type for simple testing
    if (!entityClasses.includes(event.metadata.target as any)) {
      return;
    }
    if (event.entity.id) {
      return;
    }
    do {
      event.entity.id = random(10000000, 99999999);
    } while (await event.manager.findOneBy(event.metadata.target, { id: event.entity.id }));
  }
}
