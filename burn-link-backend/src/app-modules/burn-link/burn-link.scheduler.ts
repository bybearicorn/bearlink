import { AppConfig, CONFIG_DEFAULT } from "@backend/config";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Interval } from "@nestjs/schedule";
import { BurnLinkService } from "./burn-link.service";

// extracted scheduled methods, so they are not only in service, lost among other methods

@Injectable()
export class BurnLinkScheduler {
  protected logger = new Logger(BurnLinkScheduler.name);

  constructor(
    private cfg: ConfigService<AppConfig>,
    private burnLinkService: BurnLinkService,
  ) {}

  private isCleanupRunning = false;

  @Interval(60 * 1000) // every min
  public async cleanupExpiredBurnLinks() {
    if (this.cfg.get("DISABLE_JOBS", CONFIG_DEFAULT.DISABLE_JOBS) === "true") {
      return;
    }
    if (this.isCleanupRunning) {
      return;
    }
    this.logger.debug("Running cleanupExpiredBurnLinks");
    this.isCleanupRunning = true;
    try {
      await this.burnLinkService.cleanupExpiredBurnLinks();
    } catch (e) {
      this.logger.fatal(`Error while deleting expired burn links: ${e.message}`);
    } finally {
      this.logger.debug("Finished cleanupExpiredBurnLinks");
      this.isCleanupRunning = false;
    }
  }
}
