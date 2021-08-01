import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Container } from 'react-bootstrap';

const Faq = () => {
  const faqQuestions: Array<[string, ReactNode]> = [
    [
      'Jaki jest dress code?',
      'Casual, przyjdź tak, żeby Ci było wygodnie. Koszule, jeansy, kurtki, katany, sukienki, spódnice, koszulki mile widziane. Nie bierzcie butów za dwa koła, bo możecie je sobie ubrudzić.',
    ],
    [
      'Nie mam jak dojechać, co zrobić?',
      <p>
        Sprawdź <Link to="/guest-list">listę gości</Link> i spróbuj podpytać
        innych czy by nie mogli Ciebie zabrać. Jeśli nie udało Ci się nic
        ogarnąć to zgłoś się do mnie na pw.
      </p>,
    ],
    ['Nie mam jak wrócić', 'To samo co w pytaniu wyżej.'],
    [
      'Nie mam pomysłu na prezent',
      <div>
        Tutaj jest lista przykładowych prezentów, z każdego z nich będę
        zadowolony:
        <ul>
          <li>
            <b>WSZELKIE RZECZY DIY</b>
          </li>
          <li>
            <b>Customowe rzeczy</b>(typu kubki, czapki, torby, naklejki, mega
            lubię takie spersonalizowane rzeczy, bardzo duży wybór jest na{' '}
            <a href="https://www.megakoszulki.pl/kreator-nadrukow-produkty-z-wlasnym-nadrukiem">
              megakoszulki.pl
            </a>
            )
          </li>
          <li>
            <b>Zdjęcia w ramkach, albumy</b>
          </li>
          <li>
            <b>Hajs</b> (serio, będę bardziej niż zadowolony XD)
          </li>
          <li>
            <b>Alkohol</b> (nie mam preferencji, wszystko od dobrego piwa po
            przefiltrowany denaturat)
          </li>
          <li>
            <b>Noże do rzucania</b> (jakiekolwiek, serio)
          </li>
          <li>
            <b>Każda kawa speciality</b> (niech google wam służy)
          </li>
          <li>
            <b>Pad do xbox&apos;a one</b> (to opcja dla osób, które śpią na
            pieniądzach)
          </li>
        </ul>
      </div>,
    ],
    [
      'Gdzie jest impreza?',
      'Impreza będzie na działce wynajętego domku letniskowego. Działka znajduje się na ulicy Kormoranów 11 w Radziejach, niech google maps was prowadzi XD. Jak ktoś będzie miał problem z dojechaniem to róbcie szybki phone call do mnie, wyjdę po was. Sam jeszcze nie wiem dokładnie gdzie to.',
    ],
    [
      'Kiedy to jest? O której się kończy?',
      'Impreza zaczyna się o 18:00 dnia 28.08.2021, maksymalnie możecie zostać do 12:00 dnia następnego.',
    ],
    [
      'Czy można nocować?',
      'Miejsc do spania mam na 5 osób, ale jeśli komuś nie przeszkadza podłoga albo spodobała mu się ławka w altance to też może sobie zająć tam miejsce. Odnośnie noclegu piszcie do mnie na pw.',
    ],
    [
      'Co będzie do jedzenia?',
      'Serio, sam chciałbym wiedzieć XD. Jeszcze nad tym myślę.',
    ],
  ];

  return (
    <Container className="navbar-margin">
      <h1 className="text-center">FAQ</h1>
      <Accordion className="mt-5">
        {faqQuestions.map((questionAndAnswer, index) => (
          <Accordion.Item
            key={questionAndAnswer[0]}
            eventKey={index.toString()}
          >
            <Accordion.Header>{questionAndAnswer[0]}</Accordion.Header>
            <Accordion.Body>{questionAndAnswer[1]}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default Faq;
