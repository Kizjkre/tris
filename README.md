# tris

One thing that I've always enjoyed in performances is to give the audience agency.
In the Lansky reading, we talked about how he tried to add more nodes to the composer-performer-listener paradigm.
However, my goal, instead of further fracturing and isolating groups of people, has been to unite all of these roles, whether the original trio or Lansky's additions, into one.
A core component of this, then, involves the listener to be both the composer and the performer.
In the same sense, as occupying the more "traditional" role of composer/performer, I am also more than willing to share some of my creative agency with the "traditional" listeners, and in turn receive the ability to experience as a listener would.
I think this creates a very homogenous yet unique experience.
For starters, the uniqueness is self-explanatory: each performance will inevitably be different, and each person within the experience will have their unique experience based on their choices, interaction with others, and so on.
However, the homogeneity comes from the equal opportunities that everyone has in the collective performance of the piece.
There is no one person who has more or less say in the experience than any other.
With my performance, it can even be argued that as the "performer," I actually had the least control over the music.
By only being indirectly able to control the sound, there is a confounding variable that prevents me from being able to shape the music to my direction at will.
This was definitely elucidated in the performance: everyone could choose whether or not to follow my instructions.

The name has a multifacted meaning. One part comes from the dissolution of the triangular composer-performer-listener framework, so that everyone has the triangle in them.
Thus, **tri**s.
The other meaning of the name comes from my other source of inspiration. While thinking about how to showcase this message of the magic of collective performance, I thought about a game that I recently played: *The Legend of Zelda: Echoes of Wisdom*.
The deuteragonist, Tri, needs their friends to help them repair rifts.
In the same vein, the realization of the piece comes with the collective.

This project was definitely a great learning experience.
First, I chose to use MaxMSP for the audio processing, as it had VST support.
I also thought it would be a great opportunity to gain more familiarity in Max.
Fortunately, I had great help from Walker with Max.
The most difficult part was creating the polyphony, especially working with the `poly` object.
A crucial potential failure point is the inability to test without the whole audience, and thus, I faced many bugs where the patch and graphics worked with one device, but failed with more than one.

## Usage
- install [`Bun`](https://bun.sh) and [Max](https://cycling74.com/max)
- install dependencies `bun i`
- create ssl certificate and put in `certs/`
  - https://stackoverflow.com/a/10176685
- run `bun run index.js`
- run `tris.maxpat`
  - enable dsp
- open [host](https://localhost:3000/host.html) on computer running the server
- follow instructions, replacing `CCRMA_roam` with the network the computer is currently connected to.
- the Max patch starts out as silent in mode 0.
  - Use the left and right arrow keys to change modes.
  - Mode 1 is the bubbly transients
  - Mode 2 is the sweeping winds.
