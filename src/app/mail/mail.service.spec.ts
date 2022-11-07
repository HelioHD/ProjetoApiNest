import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllMailDto } from './dto/find-all-mail.dto';
import { SaveMailDto } from './dto/save-mail.dto';
import { MailStatusEnum } from './enum/mail-status.enum';
import { MailEntity } from './mail.entity';
import { MailService } from './mail.service';

describe('MailService', () => {
  let mailService: MailService;
  let mailRepository: Repository<MailEntity>;

  const getMany = jest.fn();


  // Testando importação de injeção de dependencias no arquivo de service
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: getRepositoryToken(MailEntity), // a gente te
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnThis(),
            andWhere: jest.fn(),
            getMany,
            findOneOrFail: jest.fn(),
            merge: jest.fn(),
          },
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mailRepository = module.get<Repository<MailEntity>>(getRepositoryToken(MailEntity));
  });
// =====================================================
  afterEach(() => {
    getMany.mockRestore();
  });


  // confirmando se está definido nos arquivos
  it('tendo certeza se está definido', () => {
    expect(mailService).toBeDefined();
    expect(mailRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('tendo certeza se retorna a lista de emails corretamente', async () => { // it's são cenarios "Se algo está funcioando de fato"
      // Arrange -- definindo o mock
      const mailEntityMockList = [
        { id: '1', dueDate: '2022-11-01T12:00:00Z' },
        { id: '2', dueDate: '2022-11-01T12:00:00Z' },
      ] as MailEntity[];
      getMany.mockResolvedValueOnce(mailEntityMockList);
      // Act -- execução de fato do teste 
      const result = await mailService.findAll();
      // Assert -- Seguro que está correto o teste
      expect(result).toHaveLength(2);
    });

    it('deve retornar uma lista de emails filtrada com dueDateLte', async () => {
      // Arrange
      const mailEntityMockList = [{ id: '2', dueDate: '2022-04-01T12:00:00Z' }] as MailEntity[];
      const params: Partial<FindAllMailDto> = { dueDateLte: '2022-04-01T12:00:00Z' };
      getMany.mockResolvedValueOnce(mailEntityMockList);
      // Act
      const result = await mailService.findAll(params);
      // Assert
      expect(result).toHaveLength(1);
    });

    it('deve retornar uma lista de e-mails filtrada com o status AGUARDANDO', async () => {
      // Arrange
      const mailEntityMockList = [{ id: '1', dueDate: '2022-04-01T12:00:00Z' }] as MailEntity[];
      const params: Partial<FindAllMailDto> = { status: MailStatusEnum.WAITING };
      getMany.mockResolvedValueOnce(mailEntityMockList);
      // Act
      const result = await mailService.findAll(params);
      // Assert
      expect(result).toHaveLength(1);
    });
  });

  describe('save', () => {
    it('sdeve salvar um novo e-mail com sucesso', async () => {
      // Arrange
      const data: SaveMailDto = {
        destinationName: 'User',
        destinationAddress: 'user@email.com',
        dueDate: '2022-11-01T12:00:00Z',
        subject: 'Email test',
        body: '<p>eae</p>',
      };
      const mailEntityMock = { ...data } as MailEntity;
      jest.spyOn(mailRepository, 'create').mockReturnValueOnce(mailEntityMock);
      jest.spyOn(mailRepository, 'save').mockResolvedValueOnce(mailEntityMock);
      // Act
      const result = await mailService.save(data);
      // Assert
      expect(result).toBeDefined();
      expect(mailRepository.create).toBeCalledTimes(1);
      expect(mailRepository.save).toBeCalledTimes(1);
    });
  });

  describe('updateStatus', () => {
    it('deve atualizar o status do e-mail com sucesso', async () => {
      // Arrange
      const id = '1';
      // Act
      const result = await mailService.updateStatus(id, MailStatusEnum.SENT);
      // Assert
      expect(result).toBeUndefined();
    });
  });
});
