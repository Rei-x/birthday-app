import React, { useContext, useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { UserContext } from '../../contexts';
import { useApi } from '../../hooks';

const MusicForm = () => {
  const api = useApi();
  const [context] = useContext(UserContext);
  const [musicURL, setMusicURL] = useState("");

  return (
    <InputGroup className="mb-3 w-50">
          <FormControl
            placeholder="New music url"
            aria-label="New music url"
            aria-describedby="musicURL"
            onChange={(e) => setMusicURL(e.target.value)}
          />
          <Button variant="outline-secondary" id="musicURL" onClick={async () => {
            try {
              await api?.updateMusicURL(musicURL);
              context.addNotification("Yay", "Zaktualizowano url muzyki");
            } catch (e) {
              context.addNotification("Lipa", e.message)
            }
          }}>
            Update
          </Button>
        </InputGroup>
  )
}

export default MusicForm
