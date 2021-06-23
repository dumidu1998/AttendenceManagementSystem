import React from 'react'
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

export default function BatchSelect(props) {
    return (
        <div>
            <Select
                native
                value={props.value}
                inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                }}
            >
                <option aria-label="None" value="" />
                <option value={10}>2018/19</option>
                <option value={20}>2017/18</option>
                <option value={30}>2018/12</option>
            </Select>
            <br />
            <br />
        </div>
    )
}
