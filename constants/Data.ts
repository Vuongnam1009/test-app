import { Images } from "assets/images";
import { Result_Types_Enum } from "./Types";

export const DATA_NEXT_APPOINTMENT = [
  {
    id: 0,
    title: "Meet Dr. Manhattan on Maple Center",
    time: "Today - 16:45 PM",
    color: "#FA4169",
  },
  {
    id: 1,
    title: "Go to Pet Lover Meeting at Pet Nation Community",
    time: "Tomorrow - 08:45 AM",
    color: "#4380FF",
  },
  {
    id: 2,
    time: "Tue, May 23 - 16:45 PM",
    title: "Meet Dr.John on Lafayette Pet Care",
    color: "#06D6A0",
  },
  {
    id: 3,
    title: "Meet Dr.John on Lafayette Pet Care",
    time: "Sun, Jul 29 - 08:30 AM",
    color: "#6266F9",
  },
];
export const customMapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f7f7f7",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#858585",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f7f7f7",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#858585",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#858585",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#f7f7f7",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f7f7f7",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#E0E0E0",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#E0E0E0",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#E0E0E0",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#E0E0E0",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#E0E0E0",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#E0E0E0",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#E0E0E0",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#A1A1A1",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#A1A1A1",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#A1A1A1",
      },
    ],
  },
];
export const DATA_INTRO = [
  {
    id: 0,
    img: Images.intro,
    title: "Social for Your Pet",
    des: "Bring together pet owners and animal lovers from all over the country!",
  },
  {
    id: 1,
    img: Images.sIntro,
    title: "Social for Your Pet",
    des: "Bring together pet owners and animal lovers from all over the country!",
  },
  {
    id: 2,
    img: Images.tIntro,
    title: "Social for Your Pet",
    des: "Bring together pet owners and animal lovers from all over the country!",
  },
  {
    id: 3,
    img: Images.fIntro,
    title: "Social for Your Pet",
    des: "Bring together pet owners and animal lovers from all over the country!",
  },
];
export const DATA_USER = {
  id: 0,
  userName: "Jackson Maxwell",
  avatar: Images.avatar,
};
export const DATA_STORY = [
  {
    id: 0,
    userName: "Annie Tran",
    avatar: Images.avatar1,
  },
  {
    id: 1,
    userName: "Isabelle fuhrman",
    avatar: Images.avatar2,
    isLive: true,
  },
  {
    id: 2,
    userName: "Emily Collins",
    avatar: Images.avatar3,
  },
  {
    id: 3,
    userName: "Charlie Puth",
    avatar: Images.avatar5,
  },
  {
    id: 4,
    userName: "Camille Razat",
    avatar: Images.avatar4,
  },
  {
    id: 5,
    userName: "Ashley Park",
    avatar: Images.avatar1,
  },
  {
    id: 6,
    userName: "Kate Walsh",
    avatar: Images.avatar3,
  },
  {
    id: 7,
    userName: "Elizabeth Tan",
    avatar: Images.avatar2,
  },
];
export const DATA_RECENT = [
  { id: 0, title: "Poodle" },
  { id: 1, title: "Jame" },
  { id: 2, title: "puppy" },
];
export const DATA_MOST_PET = [
  { id: 0, name: "Tabby", typePet: "American Bobtail", img: Images.pet1 },
  { id: 1, name: "Puppy", typePet: "Pug", img: Images.pet2 },
  { id: 2, name: "Sam", typePet: "Corgi", img: Images.pet3 },
  { id: 3, name: "Flappy", typePet: "Akita", img: Images.pet4 },
];
export const DATA_TRENDING_USER = [
  { id: 0, avatar: Images.avatar6 },
  { id: 1, avatar: Images.avatar7 },
  { id: 2, avatar: Images.avatar8 },
  { id: 3, avatar: Images.avatar9 },
  { id: 4, avatar: Images.avatar10 },
  { id: 5, avatar: Images.avatar1 },
  { id: 6, avatar: Images.avatar2 },
  { id: 7, avatar: Images.avatar3 },
];
export const DATA_RECENT_SHOT = [
  { id: 0, img: Images.recent1 },
  { id: 1, img: Images.recent2 },
  { id: 2, img: Images.recent3 },
  { id: 3, img: Images.recent4 },
  { id: 4, img: Images.recent5 },
  { id: 5, img: Images.recent6 },
  { id: 6, img: Images.recent7 },
  { id: 7, img: Images.recent8 },
  { id: 8, img: Images.recent9 },
];
export const DATA_PET_RESULT = [
  {
    id: 0,
    name: "Sam",
    breed: "Pug",
    typePet: "Dog",
    avatar: Images.pet2,
    adopt: true,
    type: Result_Types_Enum.Pet,
  },
  {
    id: 1,
    name: "Sammy",
    breed: "American",
    typePet: "Cat",
    adopt: true,
    avatar: Images.pet2,
    type: Result_Types_Enum.Pet,
  },
  {
    id: 2,
    name: "Sam",
    breed: "Pug",
    typePet: "Dog",
    avatar: Images.pet2,
    adopt: true,
    type: Result_Types_Enum.Pet,
  },
  {
    id: 3,
    name: "Sam",
    breed: "Pug",
    typePet: "Dog",
    adopt: false,
    avatar: Images.pet2,
    type: Result_Types_Enum.Pet,
  },
  {
    id: 4,
    name: "Sam Mustard",
    adopt: false,
    breed: "Pug",
    typePet: "Hamster Owner",
    avatar: Images.pet2,
    type: Result_Types_Enum.People,
  },
  {
    id: 5,
    adopt: false,
    name: "Sam Yes",
    typePet: "Bird Owner",
    avatar: Images.pet2,
    breed: "Pug",
    type: Result_Types_Enum.People,
  },
  {
    id: 6,
    adopt: false,
    name: "Sam Brenem",
    typePet: "Cat Owner",
    breed: "Pug",
    avatar: Images.pet2,
    type: Result_Types_Enum.People,
  },
  {
    id: 7,
    adopt: false,
    name: "Sam Parker",
    typePet: "Hamster Owner",
    breed: "Pug",
    avatar: Images.pet2,
    type: Result_Types_Enum.People,
  },
  {
    id: 8,
    adopt: false,
    name: "Sam Parker",
    typePet: "Hamster Owner",
    breed: "Pug",
    avatar: Images.pet2,
    type: Result_Types_Enum.People,
  },
  {
    id: 9,
    adopt: false,
    name: "Sam Parker",
    typePet: "Hamster Owner",
    breed: "Pug",
    avatar: Images.pet2,
    type: Result_Types_Enum.People,
  },
  {
    id: 10,
    adopt: false,
    name: "Sam Parker",
    typePet: "Hamster Owner",
    breed: "Pug",
    avatar: Images.pet2,
    type: Result_Types_Enum.People,
  },
  {
    id: 11,
    adopt: false,
    name: "Sam Parker",
    typePet: "Hamster Owner",
    breed: "Pug",
    avatar: Images.pet2,
    type: Result_Types_Enum.People,
  },
];
export const DATA_PEOPLE_RESULT = [
  {
    id: 3,
    name: "Sammuel Jin",
    typePet: "Pet Owner",
    avatar: Images.pet2,
    type: Result_Types_Enum.People,
  },
  {
    id: 4,
    name: "Sunny",
    typePet: "Cat Owner",
    avatar: Images.pet2,
    type: Result_Types_Enum.People,
  },
  {
    id: 0,
    name: "Smith",
    typePet: "Cat Owner",
    avatar: Images.pet2,
    type: Result_Types_Enum.People,
  },
  {
    id: 1,
    name: "Kate Upton",
    typePet: "Dog Owner",
    avatar: Images.pet2,
    type: Result_Types_Enum.People,
  },
  {
    id: 2,
    name: "Will Smith",
    typePet: "Bird Owner",
    avatar: Images.pet2,
    type: Result_Types_Enum.People,
  },
];
export const DATA_TAG_RESULT = [
  {
    id: 6,
    name: "#sam",
    avatar: Images.tag,
    type: Result_Types_Enum.Tag,
  },
  {
    id: 7,
    name: "#sampiyc",
    avatar: Images.tag,
    type: Result_Types_Enum.Tag,
  },
  {
    id: 8,
    name: "#samhun",
    avatar: Images.tag,
    type: Result_Types_Enum.Tag,
  },
  {
    id: 9,
    name: "#samsung",
    avatar: Images.tag,
    type: Result_Types_Enum.Tag,
  },
  {
    id: 10,
    name: "#samtag",
    avatar: Images.tag,
    type: Result_Types_Enum.Tag,
  },
];
export const DATA_CMT = [
  {
    id: 0,
    avatar: Images.avatar10,
    name: "Craig Guzman",
    comment: "I'm so glad Abi is better! Sleep Tight!",
    timePost: "2m",
    isLike: true,
    numberLike: 3,
    reply: [
      {
        id: 1,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 2,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 3,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 4,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 5,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 6,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 7,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 8,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 9,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 10,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 11,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 12,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 13,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 14,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 15,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 16,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
    ],
  },
  {
    id: 1,
    avatar: Images.avatar6,
    name: "Mary Cain",
    comment: "I'm so glad Abi is better! Sleep Tight!",
    timePost: "2m",
    isLike: false,
    numberLike: 25,
    reply: [
      {
        id: 1,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 2,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 3,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 4,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 5,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 6,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 7,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 8,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
    ],
  },
  {
    id: 2,
    avatar: Images.avatar5,
    name: "Sam Smith",
    comment: "I'm so glad Abi is better! Sleep Tight!",
    timePost: "2m",
    isLike: false,
    numberLike: 25,
    reply: [
      {
        id: 1,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 2,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
      {
        id: 3,
        avatar: Images.avatar2,
        name: "Millie Harris",
        comment: "So lovely! <3",
        timePost: "2m",
        isLike: true,
        numberLike: 3,
      },
    ],
  },
];
