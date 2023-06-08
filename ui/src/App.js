import './App.css';
import { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";

const TYPE = {
    SINGLE: 'single',
    MULTI: 'multi'
}

function App() {

    const [type, setType] = useState(TYPE.SINGLE)
    const [multilinks, setMultilinks] = useState([''])
    const [customUrl, setCustomUrl] = useState('')

    const onChangeMultilink = (index, value) => {
        let temp = [...multilinks]
        temp[index] = value
        setMultilinks(temp)
    }

    const addNewMultilink = (index) => {
        let temp = [...multilinks]
        temp.splice(index, 0, '')
        setMultilinks(temp)
    }

    const deleteMultilink = index => {
        let temp = [...multilinks]
        temp.splice(index, 1)
        setMultilinks(temp)
    }

    const onSingleLinkSelected = () => {
        setType(TYPE.SINGLE)
        setMultilinks([''])
    }

    const onMultiLinkSelected = () => {
        setType(TYPE.MULTI)
        setMultilinks([''])
    }

    const createKwikUrl = () => {
        console.log({
            customUrl,
            multilinks
        })
    }

    return (
        <div className='container'>
            <div className='header'>
                <div className='subtitle'>All your links in one</div>
                <div className='title'>Kwik<span className='blue'>URL</span></div>
                <div className='slogan'>Whether you have one link or multiple links, KwikURL is all you need!</div>
            </div>



            <div className='section'>
                <div className='helper'>
                    Step 1: Enter your custom KwikURL name
                </div>
                <div className='alias-field'>
                    <div className='alias-input-field'>
                        <label className='bold'>kwikurl.pages.dev/</label>
                        <input 
                            type='text' 
                            placeholder='Your custom URL' 
                            value={customUrl}
                            onChange={e => setCustomUrl(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className='section'>
                <div className='helper'>
                    Step 2: Select KwikURL type
                </div>
                <button
                    className={`bold mr-12px ${type == TYPE.SINGLE ? '' : 'toggle-off'}`}
                    onClick={() => onSingleLinkSelected()}
                >Single link</button>
                <button
                    className={`bold mr-12px ${type == TYPE.MULTI ? '' : 'toggle-off'}`}
                    onClick={() => onMultiLinkSelected()}
                >Multiple links</button>
            </div>

            <div className='section'>
                <div className='helper'>
                    Step 3: Enter your long URL
                </div>

                {multilinks.map((li, index) => (
                    <div className='alias-field mb-12px' key={index}>
                        <div className='alias-input-field'>
                            <input
                                type='text'
                                placeholder='Paste a long URL here'
                                value={li}
                                onChange={e => onChangeMultilink(index, e.target.value)}
                            />
                        </div>
                        {type === TYPE.MULTI && (
                            <div>
                                <button className='mr-12px transparent' onClick={() => addNewMultilink(index)}><FaArrowUp /></button>
                                <button className='mr-12px transparent' onClick={() => addNewMultilink(index + 1)}><FaArrowDown /></button>
                                <button className='transparent' onClick={() => deleteMultilink(index)}><FaTrash /></button>
                            </div>
                        )}
                    </div>
                ))}


            </div>

            <div className='section'>

                <div className='helper'>
                    Step 4: Create!
                </div>
                <button className='bold' onClick={createKwikUrl}>Create KwikURL</button>
                <span className='success-toast'>Successfully created! Your KwikURL is live on <a href={`https://kwikurl.pages.dev/${customUrl}`}>https://kwikurl.pages.dev/{customUrl}</a></span>
            </div>




        </div>
    );
}

export default App;
