import { Injectable } from '@angular/core';
import { ContentStrategy } from '../strategies/content.strategy';
import { generateHash } from '../utils';

@Injectable({ providedIn: 'root' })
export class DomInsertionService {
  readonly inserted = new Set<number>();

  insertContent<T extends HTMLScriptElement | HTMLStyleElement>(
    contentStrategy: ContentStrategy<T>,
  ): T {
    const hash = generateHash(contentStrategy.content);

    if (this.inserted.has(hash)) return;

    const element = contentStrategy.insertElement();
    this.inserted.add(hash);

    return element;
  }
}
