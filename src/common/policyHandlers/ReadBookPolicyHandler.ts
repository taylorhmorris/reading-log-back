import { BooksService } from '@/books/books.service';
import { Book } from '@/books/entities/book.entity';
import { Action } from '@/casl/action';
import { AppAbility } from '@/casl/casl-ability.factory';
import { IPolicyHandler } from '@/casl/policy.handler';

export class ReadBookPolicyHandler implements IPolicyHandler {
  constructor(private readonly bookService: BooksService) {}

  handle(ability: AppAbility, book: Book): boolean {
    return ability.can(Action.Read, book);
  }
}
