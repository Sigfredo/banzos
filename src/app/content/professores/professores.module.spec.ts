import { ProfessoresModule } from './professores.module';

describe('ProfessoresModule', () => {
  let professoresModule: ProfessoresModule;

  beforeEach(() => {
    professoresModule = new ProfessoresModule();
  });

  it('should create an instance', () => {
    expect(professoresModule).toBeTruthy();
  });
});
