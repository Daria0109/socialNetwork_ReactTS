import {ApiResponseType, ResultCodes, usersAPI, UsersResponseDataType} from '../../api/api';
import {follow, getUsers, unfollow, usersActions} from './users-reducer';

jest.mock('../../api/api');
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

const followUnfollowResult: ApiResponseType = {
  data: {},
  messages: [],
  resultCode: ResultCodes.Success
}
userAPIMock.followUsers.mockReturnValue(Promise.resolve(followUnfollowResult));
userAPIMock.unfollowUsers.mockReturnValue(Promise.resolve(followUnfollowResult));

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  userAPIMock.followUsers.mockClear();
  userAPIMock.unfollowUsers.mockClear();
  userAPIMock.getUsers.mockClear();
})

test('success follow users process', async () => {
  const thunk = follow(1);
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.follow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingProgress(false, 1));

})

test('success unfollow users process', async () => {
  const thunk = unfollow(1);
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.unfollow(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleFollowingProgress(false, 1));

})

const getUsersResult: UsersResponseDataType = {
  items: [{
    name: 'Dimych1',
    id: 1,
    uniqueUrlName: null,
    photos: {
      small: null,
      large: null
    },
    status: 'status1',
    followed: false
  },
    {
      name: 'Dimych2',
      id: 2,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null
      },
      status: 'status2',
      followed: false
    },
    {
      name: 'Dimych3',
      id: 3,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null
      },
      status: 'status3',
      followed: false
    },
  ],
  totalCount: 3,
  error: ''
}
userAPIMock.getUsers.mockReturnValue(Promise.resolve(getUsersResult))
test('successful get users process should be done',  async () => {
  const thunk = getUsers(1, 5);
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(5);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, usersActions.toggleIsFetching(true));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActions.setCurrentPage(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, usersActions.toggleIsFetching(false));
  expect(dispatchMock).toHaveBeenNthCalledWith(4, usersActions.setUsers(getUsersResult.items));
  expect(dispatchMock).toHaveBeenNthCalledWith(5, usersActions.setTotalUsersCount(getUsersResult.totalCount));
  })
