import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { getOnePokemon } from '../../features/pokemons/pokemonSlice';
import { stats } from '../../comon/stats';
import { useOutsideClose } from '../../comon/hooks';
import './Modal.scss';

export const Modal = ({ isShowing, hide }) => {
  const pokemon = useSelector(getOnePokemon)
  const wrapperRef = useRef(null)
  const pokemonMoves = pokemon?.moves && pokemon?.moves.map(move => move?.move.name);

  useOutsideClose(wrapperRef, hide);

  if (Object.keys(pokemon).length === 0) return null
 
  return (
    <>
      {isShowing && pokemon ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modal-overlay"/>
          <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
            <div ref={wrapperRef} className="modal">
              <div className="modal-header">
                <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className='modal-content'>
                <div className='modal-info-header'>
                  <h2>{pokemon?.name}</h2>
                  <div>
                    <img 
                      className='modal-image' 
                      src={pokemon?.sprites?.front_default} 
                      alt={pokemon?.name}
                    />
                  </div>
                </div>
                <div>
                  <h3>Moves</h3>
                  <p className='move'>{pokemonMoves && pokemonMoves.join(', ')}</p>
                </div>
                <div>
                  <h3>Stats</h3>
                  <div className='stats-wrapper'>{stats.map(stat => {
                      return (
                        <>
                          {pokemon?.stats && pokemon?.stats.map(item => {
                            if(stat === item?.stat?.name) {
                              console.log('asdfasdf')
                              return (<div className='stats' key={stat}>
                                <div className='stat'>{stat}:</div>
                                <div>{item?.base_stat}</div>
                              </div>)
                            }
                            return null;
                          })}
                        </>
                      )
                  })}</div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>, document.body
      ) : null}
    </>
  )
};
