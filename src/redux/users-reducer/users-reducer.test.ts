import usersReducer, {usersActions, UsersInitialStateType} from './users-reducer';

let initialState: UsersInitialStateType;
beforeEach(() => {
  initialState = {
    users: [
      {
        name: "vladosik",
        id: 12414,
        uniqueUrlName: null,
        photos: {
          small: null,
          large: null
        },
        status: "проверка",
        followed: false
      }
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    portionSize: 10,
    isFetching: true,
    followingInProgress: []
  }
})
test('follow user process should be done', () => {
  const action = usersActions.follow(12414);
  const endStatus = usersReducer(initialState, action);

  expect(endStatus).toEqual({
    users: [
      {
        name: "vladosik",
        id: 12414,
        uniqueUrlName: null,
        photos: {
          "small": null,
          "large": null
        },
        status: "проверка",
        followed: true
      }
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    portionSize: 10,
    isFetching: true,
    followingInProgress: []
  })
})

test('unfollow user process should be done', () => {
  const action = usersActions.unfollow(12414);
  const endState = usersReducer(initialState, action);

  expect(endState).toEqual(initialState);
})

test('new users should be set', () => {
  const action = usersActions.setUsers([{
    name: "Ziapa",
    id: 12411,
    uniqueUrlName: null,
    photos: {
      small: null,
      large: null
    },
    status: null,
    followed: false
  }]);
  const endState = usersReducer(initialState, action);

  expect(endState).toEqual({
    users: [{
      name: "Ziapa",
      id: 12411,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null
      },
      status: null,
      followed: false
    }],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    portionSize: 10,
    isFetching: true,
    followingInProgress: []
  })
})

test('current page should be set', () => {
  const action = usersActions.setCurrentPage(1000);
  const endState = usersReducer(initialState, action);

  expect(endState).toEqual({
    users: [
      {
        name: "vladosik",
        id: 12414,
        uniqueUrlName: null,
        photos: {
          small: null,
          large: null
        },
        status: "проверка",
        followed: false
      }
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1000,
    portionSize: 10,
    isFetching: true,
    followingInProgress: []
  })
})

test('total users count should be set', () => {
  const action = usersActions.setTotalUsersCount(10);
  const endState = usersReducer(initialState, action);

  expect(endState).toEqual({
    users: [
      {
        name: "vladosik",
        id: 12414,
        uniqueUrlName: null,
        photos: {
          "small": null,
          "large": null
        },
        status: "проверка",
        followed: false
      }
    ],
    pageSize: 5,
    totalUsersCount: 10,
    currentPage: 1,
    portionSize: 10,
    isFetching: true,
    followingInProgress: []
  })
})

test('isFetching should be toggled', () => {
  const action = usersActions.toggleIsFetching(true);
  const endState = usersReducer(initialState, action);

  expect(endState).toEqual({
    users: [
      {
        name: "vladosik",
        id: 12414,
        uniqueUrlName: null,
        photos: {
          small: null,
          large: null
        },
        status: "проверка",
        followed: false
      }
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    portionSize: 10,
    isFetching: true,
    followingInProgress: []
  })
})

test('following progress should be toggled', () => {
  const action = usersActions.toggleFollowingProgress(true, 12414);
  const endState = usersReducer(initialState, action);

  expect(endState).toEqual({
    users: [
      {
        name: "vladosik",
        id: 12414,
        uniqueUrlName: null,
        photos: {
          small: null,
          large: null
        },
        status: "проверка",
        followed: false
      }
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    portionSize: 10,
    isFetching: true,
    followingInProgress: [12414]
  })
})