import { Post } from './post';

export class PostData {

  static Posts: Post[] = [
    {
      id: 1,
      title: 'Something Wicked This Way Comes',
      body: 'This is the most satisfying musical to hit the high school stage since Fiddler on the Roof',
      categoryId: 10,
      userId: 1
    },
    {
      id: 2,
      title: "It's not the Wizard of Oz!",
      body: "Though it doesn't have the magic of Wizard of Oz, it is a solid musical",
      categoryId: 1,
      userId: 2
    },
    {
      id: 3,
      title: 'Satisfaction Guaranteed',
      body: 'What a great way to spend an evening.',
      categoryId: 10,
      userId: 1
    },
    {
      id: 4,
      title: 'The Characters!',
      body: 'The characters came to life on that stage.',
      categoryId: 8,
      userId: 1
    },
    {
      id: 5,
      title: 'Emerald City Here We Come!',
      body: "If you've missed the magic of the Emerald City, here's your chance to experience it all over again in a fresh new way",
      categoryId: 6,
      userId: 2
    },
    {
      id: 6,
      title: 'I Am Defying Gravity',
      body: 'The songs make you feel like you are defying gravity and floating on air',
      categoryId: 2,
      userId: 3
    },
    {
      id: 7,
      title: 'The Actors Fell Flat',
      body: "The actors didn't breathe life into any of the characters.",
      categoryId: 8,
      userId: 1
    },
    {
      id: 8,
      title: 'Beyond the Yellow Brick Road',
      body: 'Follow the yellow brick road to a wonderfully new story in the Emerald City universe',
      categoryId: 6,
      userId: 1
    },
    {
      id: 9,
      title: 'Sad, Wickedly Sad',
      body: 'Portraying a set of characters that can never catch a break, this musical is just too sad',
      categoryId: 9,
      userId: 2
    },
    {
      id: 10,
      title: 'So, Popular?',
      body: 'The emphasis on popularity and power makes this entire story just too sad',
      categoryId: 9,
      userId: 3
    },
    {
      id: 11,
      title: 'No restroom line',
      body: 'For once there was no line for the ladies room!',
      categoryId: 5,
      userId: 2
    },
    {
      id: 12,
      title: 'Better SWAG',
      body: 'It would have been fun to have more/better SWAG',
      categoryId: 3,
      userId: 1
    },
    // Invalid category on purpose
    {
      id: 13,
      title: 'I Loved It',
      body: 'I loved every minute! Definitely worth the cost of admission',
      categoryId: 42,
      userId: 1
    }
  ];
}
