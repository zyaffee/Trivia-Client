import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { gameIndex } from '../api/game'
import UserGamePlay from './UserGamePlay'

// this is the component to index all games
const UserGameIndex = ({ user, msgAlert }) => {
    //handleclick function to send user to UserGamePlay component
   
    
    //state
    const [allGames, setAllGames] = useState([])

    useEffect(()=> {
        
        gameIndex(user)
            .then(res => {
                setAllGames(res.data.games)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Index Games Failure' + error,
                    variant: 'danger'
                })
            })
    }, [])

    const gamePreview = allGames.map(game => (
        
        <Card key= {game.id} className='m-4' style={{width: '400px', display: 'flex', padding: '5px'}}>
            <Card.Header>{ game.name }</Card.Header>
                <Card.Text>
                     This is a game 
                     { 
                        user && game.owner && user._id === game.owner._id 
                        ?
                        <>
                            <Link className='btn btn-info'
                            to={`/games/${game.id}`}>Edit</Link>
                           
                        </>
                        :
                        <Link className='btn btn-info'
                     to={`/play-game/${game.id}`}> Play</Link>
                        
                        
                    }
                </Card.Text>
                <Card.Footer></Card.Footer>
        </Card>
    ))

    return (
        <div>
            { gamePreview }
        </div>
    )
}

export default UserGameIndex