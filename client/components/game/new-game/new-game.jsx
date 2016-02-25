import React from 'react';

export default React.createClass({
    onClick (option)
    {
        return (e)
        {

        }
    },


   render(){
       return {
           <div>
               <h1 className="new-game__title">{this.props.title}</h1>
               <div className="new-game__body">{this.props.body}</div>
               <button className="new-game__button" onClick=this.onClick(1)/>
               <button className="new-game__button" onClick=this.onClick(2)/>
           </div>
       }
   }
});