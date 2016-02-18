import React from 'react';
import ProgramListItem from 'program_list_item';
export default React.createClass({
    render() {
        return (
        (this.Programs.map((programListItem, i) => (
            <div>
                <ProgramListItem programListItem={programListItem} key={i} />
            <div/>
        ))
        );
    }
});