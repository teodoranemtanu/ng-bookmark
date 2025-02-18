import { KeyValue } from '@angular/common';
import { GroupTypes } from '../core/enums/group-types.enum';
import { Bookmark } from '../core/models/bookmark.model';
import * as dateUtils from './date-utils';

export const sortGroupsByKeyAsc = (a: KeyValue<GroupTypes, Bookmark[]>, b: KeyValue<GroupTypes, Bookmark[]>): number => {
  return a.key - b.key;
}

export const getCurrentGroupType = (bookmarkDate: Date) => {
  if (dateUtils.isDateToday(bookmarkDate)) {
    return GroupTypes.today;
  } else if (dateUtils.isDateYesterday(bookmarkDate)) {
    return GroupTypes.yesterday;
  }
  return GroupTypes.others;
};