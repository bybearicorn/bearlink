import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Equal, LessThan, Repository } from "typeorm";

import { BurnLinkEntity } from "@backend/entities/burn-link.entity";
import dayjs from "dayjs";

@Injectable()
export class BurnLinkService {
  private readonly logger = new Logger(BurnLinkService.name);

  constructor(@InjectRepository(BurnLinkEntity) private repo: Repository<BurnLinkEntity>) {}

  public async create(message: string, expirationMin?: number | null) {
    const now = dayjs();
    const burnLink = BurnLinkEntity.builder({
      message,
      expires: expirationMin ? now.add(expirationMin, "minutes").toDate() : null,
      created: now.toDate(),
    });
    const { id } = await this.repo.save(burnLink);
    return id;
  }

  public async remove(id: number) {
    return this.repo.delete({ id: Equal(id) });
  }

  public async get(id: number) {
    const burnLink = await this.repo.findOneBy({ id: Equal(id) });
    if (!burnLink) {
      this.logger.warn(`ID ${id} not found`);
      throw new NotFoundException();
    }
    if (burnLink.expires && burnLink.expires < new Date()) {
      this.logger.warn(`Burnlink ${id} expired, deleting`);
      await this.remove(id);
      throw new NotFoundException();
    }
    return burnLink;
  }

  public async cleanupExpiredBurnLinks() {
    const toDelete = await this.repo.findBy({ expires: LessThan(new Date()) });
    if (!toDelete.length) {
      this.logger.debug("No burnlinks to cleanup");
      return;
    }
    this.logger.log(`Deleting ${toDelete.length} expired burn link(s)`);
    await this.repo.delete(toDelete.map(({ id }) => id));
  }
}
