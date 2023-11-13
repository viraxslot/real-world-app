import crypto from 'crypto';

export class TestHelper {
  static runId: string;

  static getRunId() {
    if (!this.runId) {
      this.runId = crypto.randomBytes(4).toString('hex');
    }
    return this.runId;
  }
}
