export const userData = {
  iat: Date.now(),
  exp: Date.now() + 10000000,
  sub: 1,
  name: "Rocko",
  username: "rocko1",
  admin: false,
};

export const adminData = {
  iat: Date.now(),
  exp: Date.now() + 10000000,
  sub: 2,
  name: "Dr. Hutchison",
  username: "hutch1",
  admin: true,
};

export const dmData = {
  direct_messages: [
    {
      id: 1,
      category: "private",
      sender_id: 2,
      recipient_id: 1,
      subject: "Hey Hef!",
      created_at: "2021-03-01T03:09:21.446Z",
      updated_at: "2021-03-01T03:09:21.446Z",
      messages: [
        {
          id: 1,
          content: "I can write to you now!",
          author_id: 2,
          messageable_type: "DirectMessage",
          messageable_id: 1,
          created_at: "2021-03-02T22:18:06.336Z",
          updated_at: "2021-03-02T22:18:06.336Z",
          read_by: [],
        },
      ],
    },
  ],
  unread_count: 0,
  partners: [
    {
      "1": {
        name: "Heffer",
        profile_pic: "default_user.svg",
      },
    },
  ],
};

export const msgData = {
  id: 2,
  content: "you're cool.",
  author_id: 1,
  messageable_type: "DirectMessage",
  messageable_id: 1,
  created_at: "2021-03-02T22:18:06.336Z",
  updated_at: "2021-03-02T22:18:06.336Z",
  read_by: [],
};

export const courseData = {
  id: 1,
  created_at: "2021-03-02T22:18:06.336Z",
  updated_at: "2021-03-02T22:18:06.336Z",
  curator_id: 1,
  curator_name: "Shooter G",
  name: "Skeleton Peak",
  description:
    "This course is insane. Don't play it unless you're cool with near-death experiences.",
  current_conditions: "Sketchy",
  public_availability: "Public",
  seasonality: "Year-Round",
  lat: -3.067425,
  lng: 37.355625,
  address: "1215 Kilimanjaro Lane",
  city: "Tanzania",
  state: "CO",
  zip: 80211,
  course_designer: "Volcanic Activity",
  teepads: "Lava",
  baskets: "Tanzanian Disc Grabbers",
  established: 1999,
  pet_policy: "Allowed",
  public_restrooms: true,
  cart_friendly: true,
  free_parking: true,
  camping: true,
  dedicated_property: true,
  photos: [
    {
      url: "https://amazingphotos.com/photonumber9",
      uploader_id: 1,
      photo_attachable_type: "Course",
      photo_attachable_id: 1,
      created_at: "2021-03-02T22:18:06.336Z",
      updated_at: "2021-03-02T22:18:06.336Z",
    },
    {
      url: "https://amazingphotos.com/photonumber10",
      uploader_id: 1,
      photo_attachable_type: "Course",
      photo_attachable_id: 1,
      created_at: "2021-03-02T22:18:06.336Z",
      updated_at: "2021-03-02T22:18:06.336Z",
    },
    {
      url: "https://amazingphotos.com/photonumber11",
      uploader_id: 1,
      photo_attachable_type: "Course",
      photo_attachable_id: 1,
      created_at: "2021-03-02T22:18:06.336Z",
      updated_at: "2021-03-02T22:18:06.336Z",
    },
  ],
  hole_layouts: [
    {
      course_id: 1,
      id: 1,
      name: "Buzzard's Perch",
    },
  ],
  holes: [
    {
      id: 1,
      name: "1",
      par: 3,
      distance: 305,
      created_at: "2021-03-02T22:18:06.336Z",
      updated_at: "2021-03-02T22:18:06.336Z",
    },
    {
      id: 2,
      name: "2",
      par: 4,
      distance: 480,
      created_at: "2021-03-02T22:18:06.336Z",
      updated_at: "2021-03-02T22:18:06.336Z",
    },
    {
      id: 3,
      name: "3",
      par: 5,
      distance: 721,
      created_at: "2021-03-02T22:18:06.336Z",
      updated_at: "2021-03-02T22:18:06.336Z",
    },
  ],
};
