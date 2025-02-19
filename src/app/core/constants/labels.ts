export const labels = {
  new: {
    title: 'Add new bookmark',
    placeholders: {
      name: 'Name',
      url: 'Url'
    },
    description: 'Type name and url',
    save: 'Create bookmark',
    errors: {
      nameRequired: 'Bookmark name is required',
      urlRequired: 'Bookmark url is required',
      urlIncorrect: 'Bookmark url is not correct'
    }
  },
  edit: {
    title: 'Edit Existing bookmark',
    placeholders: {
      name: 'Name',
      url: 'Url'
    },
    description: 'Type name and url',
    save: 'Update bookmark',
    errors: {
      nameRequired: 'Bookmark name is required',
      urlRequired: 'Bookmark url is required',
      urlIncorrect: 'Bookmark url is not correct'
    }
  },
  search: {
    placeholder: 'Search bookmark...'
  },
  appTitle: 'Bookmarker',
  groups: ['today', 'yesterday', 'others'],
  searchResultsMessage: 'Search results:',
  saveSuccess: 'The bookmark was saved successfully',
  error: 'Action could not be completed'
}