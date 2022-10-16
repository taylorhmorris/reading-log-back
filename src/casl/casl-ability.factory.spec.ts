import { Author } from '@/authors/entities/author.entity';
import { Book } from '@/books/entities/book.entity';
import { Language } from '@/languages/entities/language.entity';
import { Note } from '@/notes/entities/note.entity';
import { Reading } from '@/readings/entities/reading.entity';
import { User } from '@/users/entities/user.entity';
import { Action } from './utils/action';
import { CaslAbilityFactory } from './casl-ability.factory';
import { OwnedEntity } from '@/common/entities/owned.entity';

describe('CaslAbilityFactory', () => {
  const caslAbilityFactory = new CaslAbilityFactory();

  it('should be defined', () => {
    expect(caslAbilityFactory).toBeDefined();
  });

  describe('should let regular User manage own private', () => {
    it('Author', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const author = new Author();
      author.ownerId = 1;
      author.isPublic = false;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, author)).toBe(true);
      expect(ability.can(Action.Update, author)).toBe(true);
      expect(ability.can(Action.Delete, author)).toBe(true);
      expect(ability.can(Action.Manage, author)).toBe(true);
    });

    it('Book', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const book = new Book();
      book.ownerId = 1;
      book.isPublic = false;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, book)).toBe(true);
      expect(ability.can(Action.Update, book)).toBe(true);
      expect(ability.can(Action.Delete, book)).toBe(true);
      expect(ability.can(Action.Manage, book)).toBe(true);
    });

    it('Language', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const language = new Language();
      language.ownerId = 1;
      language.isPublic = false;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, language)).toBe(true);
      expect(ability.can(Action.Update, language)).toBe(true);
      expect(ability.can(Action.Delete, language)).toBe(true);
      expect(ability.can(Action.Manage, language)).toBe(true);
    });

    it('Reading', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const reading = new Reading();
      reading.ownerId = 1;
      reading.isPublic = false;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, reading)).toBe(true);
      expect(ability.can(Action.Update, reading)).toBe(true);
      expect(ability.can(Action.Delete, reading)).toBe(true);
      expect(ability.can(Action.Manage, reading)).toBe(true);
    });

    it('Note', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const note = new Note();
      note.ownerId = 1;
      note.isPublic = false;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, note)).toBe(true);
      expect(ability.can(Action.Update, note)).toBe(true);
      expect(ability.can(Action.Delete, note)).toBe(true);
      expect(ability.can(Action.Manage, note)).toBe(true);
    });
  });

  describe('should let regular User only read their own public', () => {
    it('Author', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const author = new Author();
      author.ownerId = 1;
      author.isPublic = true;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, author)).toBe(true);
      expect(ability.can(Action.Update, author)).toBe(false);
      expect(ability.can(Action.Delete, author)).toBe(false);
      expect(ability.can(Action.Manage, author)).toBe(false);
    });

    it('Book', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const book = new Book();
      book.ownerId = 1;
      book.isPublic = true;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, book)).toBe(true);
      expect(ability.can(Action.Update, book)).toBe(false);
      expect(ability.can(Action.Delete, book)).toBe(false);
      expect(ability.can(Action.Manage, book)).toBe(false);
    });

    it('Language', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const language = new Language();
      language.ownerId = 1;
      language.isPublic = true;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, language)).toBe(true);
      expect(ability.can(Action.Update, language)).toBe(false);
      expect(ability.can(Action.Delete, language)).toBe(false);
      expect(ability.can(Action.Manage, language)).toBe(false);
    });

    it('Reading', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const reading = new Reading();
      reading.ownerId = 1;
      reading.isPublic = true;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, reading)).toBe(true);
      expect(ability.can(Action.Update, reading)).toBe(false);
      expect(ability.can(Action.Delete, reading)).toBe(false);
      expect(ability.can(Action.Manage, reading)).toBe(false);
    });

    it('Note', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const note = new Note();
      note.ownerId = 1;
      note.isPublic = true;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, note)).toBe(true);
      expect(ability.can(Action.Update, note)).toBe(false);
      expect(ability.can(Action.Delete, note)).toBe(false);
      expect(ability.can(Action.Manage, note)).toBe(false);
    });
  });

  describe("should let regular User only read others' public", () => {
    it('Author', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const author = new Author();
      author.ownerId = 2;
      author.isPublic = true;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, author)).toBe(true);
      expect(ability.can(Action.Update, author)).toBe(false);
      expect(ability.can(Action.Delete, author)).toBe(false);
      expect(ability.can(Action.Manage, author)).toBe(false);
    });

    it('Book', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const book = new Book();
      book.ownerId = 2;
      book.isPublic = true;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, book)).toBe(true);
      expect(ability.can(Action.Update, book)).toBe(false);
      expect(ability.can(Action.Delete, book)).toBe(false);
      expect(ability.can(Action.Manage, book)).toBe(false);
    });

    it('Language', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const language = new Language();
      language.ownerId = 2;
      language.isPublic = true;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, language)).toBe(true);
      expect(ability.can(Action.Update, language)).toBe(false);
      expect(ability.can(Action.Delete, language)).toBe(false);
      expect(ability.can(Action.Manage, language)).toBe(false);
    });

    it('Reading', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const reading = new Reading();
      reading.ownerId = 2;
      reading.isPublic = true;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, reading)).toBe(true);
      expect(ability.can(Action.Update, reading)).toBe(false);
      expect(ability.can(Action.Delete, reading)).toBe(false);
      expect(ability.can(Action.Manage, reading)).toBe(false);
    });

    it('Note', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const note = new Note();
      note.ownerId = 2;
      note.isPublic = true;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, note)).toBe(true);
      expect(ability.can(Action.Update, note)).toBe(false);
      expect(ability.can(Action.Delete, note)).toBe(false);
      expect(ability.can(Action.Manage, note)).toBe(false);
    });
  });

  describe("should not let regular User read others' private", () => {
    it('Author', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const author = new Author();
      author.ownerId = 2;
      author.isPublic = false;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, author)).toBe(false);
      expect(ability.can(Action.Update, author)).toBe(false);
      expect(ability.can(Action.Delete, author)).toBe(false);
      expect(ability.can(Action.Manage, author)).toBe(false);
    });

    it('Book', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const book = new Book();
      book.ownerId = 2;
      book.isPublic = false;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, book)).toBe(false);
      expect(ability.can(Action.Update, book)).toBe(false);
      expect(ability.can(Action.Delete, book)).toBe(false);
      expect(ability.can(Action.Manage, book)).toBe(false);
    });

    it('Language', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const language = new Language();
      language.ownerId = 2;
      language.isPublic = false;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, language)).toBe(false);
      expect(ability.can(Action.Update, language)).toBe(false);
      expect(ability.can(Action.Delete, language)).toBe(false);
      expect(ability.can(Action.Manage, language)).toBe(false);
    });

    it('Reading', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const reading = new Reading();
      reading.ownerId = 2;
      reading.isPublic = false;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, reading)).toBe(false);
      expect(ability.can(Action.Update, reading)).toBe(false);
      expect(ability.can(Action.Delete, reading)).toBe(false);
      expect(ability.can(Action.Manage, reading)).toBe(false);
    });

    it('Note', () => {
      const user = new User();
      user.id = 1;
      user.isAdmin = false;
      const note = new Note();
      note.ownerId = 2;
      note.isPublic = false;
      const ability = caslAbilityFactory.createForUser(user);
      expect(ability.can(Action.Read, note)).toBe(false);
      expect(ability.can(Action.Update, note)).toBe(false);
      expect(ability.can(Action.Delete, note)).toBe(false);
      expect(ability.can(Action.Manage, note)).toBe(false);
    });
  });

  describe('should let users modify themselves', () => {
    const user = new User();
    user.id = 1;
    user.isAdmin = false;
    const ability = caslAbilityFactory.createForUser(user);

    it('can manage username', () => {
      return expect(ability.can(Action.Manage, user, 'username')).toBe(true);
    });

    it('can manage email', () => {
      return expect(ability.can(Action.Manage, user, 'email')).toBe(true);
    });

    it('can manage password', () => {
      return expect(ability.can(Action.Manage, user, 'password')).toBe(true);
    });

    it('can read isAdmin', () => {
      return expect(ability.can(Action.Read, user, 'isAdmin')).toBe(true);
    });
    it('cannot modify isAdmin', () => {
      return expect(ability.can(Action.Update, user, 'isAdmin')).toBe(false);
    });
  });

  describe('should let users view other users public info', () => {
    const user = new User();
    user.id = 1;
    user.isAdmin = false;
    const ability = caslAbilityFactory.createForUser(user);
    const other = new User();
    other.id = 2;
    other.isAdmin = true;

    it('can read username', () => {
      return expect(ability.can(Action.Read, other, 'username')).toBe(true);
    });
    it('cannot update username', () => {
      return expect(ability.can(Action.Update, other, 'username')).toBe(false);
    });

    it('cannot read email', () => {
      return expect(ability.can(Action.Read, other, 'email')).toBe(false);
    });

    it('cannot read password', () => {
      return expect(ability.can(Action.Read, other, 'password')).toBe(false);
    });

    it('can read isAdmin', () => {
      return expect(ability.can(Action.Read, other, 'isAdmin')).toBe(true);
    });

    it('cannot modify isAdmin', () => {
      return expect(ability.can(Action.Update, other, 'isAdmin')).toBe(false);
    });
  });

  describe('should not let users create entities for other users', () => {
    const user: User = {
      id: 1,
      isAdmin: false,
      username: 'bob',
      password: 'bob',
      email: 'bob@bob.com',
    };
    const ability = caslAbilityFactory.createForUser(user);
    const entity: OwnedEntity = {
      ownerId: 2,
      id: 1,
      owner: new User(),
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('cannot create if ownerId !== user.id', () => {
      return expect(ability.can(Action.Create, entity)).toBe(false);
    });

    it('can create if ownerId === user.id', () => {
      const entity = new Author();
      entity.ownerId = 1;
      entity.isPublic = false;
      return expect(ability.can(Action.Create, entity)).toBe(true);
    });
  });
});
