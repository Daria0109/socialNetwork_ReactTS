import profileReducer, {profileActions, ProfileInitialStateType} from './profile-reducer';

let initialState: ProfileInitialStateType

beforeEach(() => {
  initialState = {
    posts: [
      {
        id: 1,
        message: 'Hey, how are you?',
        likesCount: 15,
        avatar: 'https://i.pinimg.com/originals/32/3b/c2/323bc2e28f35a760b8d7afe48f3ffe48.png'
      },
      {
        id: 2,
        message: 'This is my first post',
        likesCount: 25,
        avatar: 'https://i.pinimg.com/originals/5a/f1/dd/5af1ddcde07255e8a999abcc061dd201.png'
      }
    ],
    profile: {
      aboutMe: '',
      contacts: {
        facebook: '',
        website: '',
        vk: '',
        twitter: '',
        instagram: '',
        youtube: '',
        github: '',
        mainLink: ''
      },
      lookingForAJob: false,
      lookingForAJobDescription: '',
      fullName: '',
      userId: 0,
      photos: {
        large: '',
        small: ''
      }
    },
    status: '',
    editMode: false
  }
})

test('new post should be added', () => {
  const action = profileActions.addPost('I want to be a frontend developer');
  const endState = profileReducer(initialState, action);

  expect(endState).toEqual({
    posts: [
      {
        id: 1,
        message: 'Hey, how are you?',
        likesCount: 15,
        avatar: 'https://i.pinimg.com/originals/32/3b/c2/323bc2e28f35a760b8d7afe48f3ffe48.png'
      },
      {
        id: 2,
        message: 'This is my first post',
        likesCount: 25,
        avatar: 'https://i.pinimg.com/originals/5a/f1/dd/5af1ddcde07255e8a999abcc061dd201.png'
      },
      {
        id: 5,
        message: 'I want to be a frontend developer',
        likesCount: 0,
        avatar: 'https://finance.kz/static/images/default-avatar.png'
      }
    ],
    profile: {
      aboutMe: '',
      contacts: {
        facebook: '',
        website: '',
        vk: '',
        twitter: '',
        instagram: '',
        youtube: '',
        github: '',
        mainLink: ''
      },
      lookingForAJob: false,
      lookingForAJobDescription: '',
      fullName: '',
      userId: 0,
      photos: {
        large: '',
        small: ''
      }
    },
    status: '',
    editMode: false
  })
})

test('user profile info should be added', () => {
  const action = profileActions.setUserProfile({
    'aboutMe': 'я круто чувак 1001%',
    'contacts': {
      'facebook': 'facebook.com',
      'website': '',
      'vk': 'vk.com/dimych',
      'twitter': 'https://twitter.com/@sdf',
      'instagram': 'instagra.com/sds',
      'youtube': '',
      'github': 'github.com',
      'mainLink': ''
    },
    'lookingForAJob': true,
    'lookingForAJobDescription': 'не ищу, а дурачусь',
    'fullName': 'samurai dimych',
    'userId': 2,
    'photos': {
      'small': 'https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0',
      'large': 'https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0'
    }
  });
  const endState = profileReducer(initialState, action);

  expect(endState).toEqual({
    posts: [
      {
        id: 1,
        message: 'Hey, how are you?',
        likesCount: 15,
        avatar: 'https://i.pinimg.com/originals/32/3b/c2/323bc2e28f35a760b8d7afe48f3ffe48.png'
      },
      {
        id: 2,
        message: 'This is my first post',
        likesCount: 25,
        avatar: 'https://i.pinimg.com/originals/5a/f1/dd/5af1ddcde07255e8a999abcc061dd201.png'
      }
    ],
    profile: {
      'aboutMe': 'я круто чувак 1001%',
      'contacts': {
        'facebook': 'facebook.com',
        'website': '',
        'vk': 'vk.com/dimych',
        'twitter': 'https://twitter.com/@sdf',
        'instagram': 'instagra.com/sds',
        'youtube': '',
        'github': 'github.com',
        'mainLink': ''
      },
      'lookingForAJob': true,
      'lookingForAJobDescription': 'не ищу, а дурачусь',
      'fullName': 'samurai dimych',
      'userId': 2,
      'photos': {
        'small': 'https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0',
        'large': 'https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0'
      }
    },
    status: '',
    editMode: false
  })
})
test('new status should be set', () => {
  const action = profileActions.setStatus('New status!');
  const endState = profileReducer(initialState, action);

  expect(endState.status).toBeDefined();
  expect(endState.status).toBe('New status!');
})
test('profile photo should be saved', () => {
  const action = profileActions.savePhotoSuccess({
    large: 'largePhoto.example',
    small: 'smallPhoto.example'
  });
  const endState = profileReducer(initialState, action);

  expect(endState.profile.photos.small).toBeTruthy();
  expect(endState.profile.photos.large).toBeTruthy();
  expect(endState.profile.photos.small).toBe('smallPhoto.example');
  expect(endState.profile.photos.large).toBe('largePhoto.example');

})
test('editMode of profile should be set', () => {
  const action = profileActions.setEditModeProfile(true);
  const endState = profileReducer(initialState, action);

  expect(endState.editMode).toBeTruthy();
  expect(endState.editMode).toBe(true);
})