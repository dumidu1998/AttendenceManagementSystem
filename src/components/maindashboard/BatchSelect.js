import React, { useEffect, useState } from 'react'
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { db } from '../../firebase';

export default function BatchSelect(props) {


    const [batches, setbatches] = useState([]);

    useEffect(() => {
        db.collection('batch').onSnapshot(snapshot => {
            setbatches(snapshot.docs.map(doc => ({ name: doc.data().name })))
        });

    }, [])

    return (
        <div>
            <Select
                native
                // value={props.value}
                onChange={(e) => props.setvalue(e.target.value)}
            >
                {
                    batches.map(batch => (
                        <option value={batch.name}>{batch.name}</option>
                    ))
                }
            </Select>
            <br />
            <br />
        </div>
    )
}
