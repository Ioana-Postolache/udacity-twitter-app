import React, {Component} from 'react'
import {handleAddTweet} from '../actions/tweets'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


class NewTweet extends Component{
  state ={
    text:'',
    toHome:false,
  }

  handleChange=(e)=>{
    const text = e.target.value
    this.setState(()=>({
      text
    }))
  }

  handleSubmit=(e)=>{
    e.preventDefault()
    const {text} = this.state
    const {dispatch, replyingTo} =this.props

    dispatch(handleAddTweet(text,replyingTo ))
    console.log('New tweet is ', text)
    this.setState(()=>({
      text:'',
      toHome:replyingTo ? false :true
    })
    )
  }

  render(){
    const {text, toHome} = this.state

    if(toHome===true){
      return <Redirect to='/'/>
    }

    const tweetLeft = 280 - text.length
    return(
      <div>
        <h3 className='center'>Compose new Tweet</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}/>
            {tweetLeft<=100 &&(
              <div className='tweet-length'>
                {tweetLeft}
              </div>
            )}
            <button
              className='btn'
              type='submit'
              disabled={text===''}>
              Submit
            </button>
        </form>
      </div>
    )
  }
}


export default connect()(NewTweet)
