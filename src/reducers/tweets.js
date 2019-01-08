import {RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET} from '../actions/tweets'

export default function tweets(state={}, action){
  switch(action.type){
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.payload
      }
    case TOGGLE_TWEET:
      return{
         ...state,
         [action.payload.id] : {
           ...state[action.payload.id],
           likes: action.payload.hasLiked===true
                    ? state[action.payload.id].likes.filter(
                        user=>user!==action.payload.authedUser)
                    :state[action.payload.id].likes.concat(action.payload.authedUser)
         }
      }
    case ADD_TWEET:
      const tweet = action.payload

      let replyingTo = {}
      if (tweet.replyingTo !== null){
          replyingTo = { [tweet.replyingTo]: {
         ...state[tweet.replyingTo],
         replies: state[tweet.replyingTo].replies.concat([tweet.id])
       }}
      }

      return{
        ...state,
        [tweet.id] : tweet,
         ...replyingTo
      }
    default:
      return state
  }
}
