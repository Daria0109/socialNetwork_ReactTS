import profileReducer, {addPost, ProfileInitialStateType, setUserProfile, updatePost} from './profile-reducer';

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
    newTextPost: '',
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
    }
  }
})

test('post text should be updated', () => {
  const action = updatePost('Have a nice day!');
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
    newTextPost: 'Have a nice day!',
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
    }
  })
})

test('new post should be added', () => {
  const action = addPost();
  const endState = profileReducer(initialState,action);

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
        message: '',
        likesCount: 0,
        avatar: 'https://finance.kz/static/images/default-avatar.png'
      }
    ],
    newTextPost: '',
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
    }
  })
})

test('user profile info should be added', () => {
  const action = setUserProfile({
    "aboutMe": "я круто чувак 1001%",
    "contacts": {
      "facebook": "facebook.com",
      "website": null,
      "vk": "vk.com/dimych",
      "twitter": "https://twitter.com/@sdf",
      "instagram": "instagra.com/sds",
      "youtube": null,
      "github": "github.com",
      "mainLink": null
    },
    "lookingForAJob": true,
    "lookingForAJobDescription": "не ищу, а дурачусь",
    "fullName": "samurai dimych",
    "userId": 2,
    "photos": {
      "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
      "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
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
    newTextPost: '',
    profile: {
      "aboutMe": "я круто чувак 1001%",
      "contacts": {
        "facebook": "facebook.com",
        "website": null,
        "vk": "vk.com/dimych",
        "twitter": "https://twitter.com/@sdf",
        "instagram": "instagra.com/sds",
        "youtube": null,
        "github": "github.com",
        "mainLink": null
      },
      "lookingForAJob": true,
      "lookingForAJobDescription": "не ищу, а дурачусь",
      "fullName": "samurai dimych",
      "userId": 2,
      "photos": {
        "small": "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=0",
        "large": "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=0"
      }
    }
  })
})