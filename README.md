# About the Project

## Abstract

The project aims to provide a simple way to give appreciation of others who helped you in some way.

## Flow

Users register with a photo. Every user have the ability to say "Thanks" to someone, even if he isn't registered as an user. Saying thanks consists of a) comment what happened b) a photo of the user who helped you c) tags (optional). The photo is used to find the user who is responsible for the good deed and to give him a reward. If no user with such photo is found we create an anonymous user with that photo, once the real person registers the photo from the registration is used to match him to the anonymous user.

## Face Recognition

__Yet to be solved.__
The application requires face recognition with only one sample [(single-sample problem)](http://yima.csl.illinois.edu/psfile/cvpr13_robust_alignment.pdf)

There are some simple techniques such as applying grayscale filter, cropping and aligning the face, extracting features that yield ~75% match rate - not sufficient for production use.

Alternative approach would be Facebook's
[DeepFace](https://research.facebook.com/publications/deepface-closing-the-gap-to-human-level-performance-in-face-verification/)



## Reward Algorithm

The rewards are given based on the actions (Thanks given). The value of the reward is calculated with Katz's graph algorithm. This approach is used in social networks and page rank algorithms.


## Used Technologies

- NodeJS
- SailsJS
- Mongo
- OpenCV
- vis.js

### Setup

		install NodeJS
		install mongo
		install OpenCV
		run npm install
		run sails lift
		visit http://localhost:1337/