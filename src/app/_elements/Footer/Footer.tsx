import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeading,
  DialogDescription,
  DialogClose,
  Typography,
} from '@/ui'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Dialog>
          <DialogTrigger>Confidentiality Policy</DialogTrigger>
          <DialogContent>
            <DialogHeading>Privacy Policy</DialogHeading>
            <DialogDescription style={{ maxWidth: '600px' }}>
              <Typography variant="text" tag="p">
                This agreement on personal data processing is developed in
                accordance with the legislation of the Russian Federation.
              </Typography>
              <Typography variant="text" tag="p">
                All persons who have filled in the information constituting
                personal data on this site, as well as placed other information
                by the specified actions confirm their consent to the processing
                of personal data and their transfer to the operator of personal
                data processing.
              </Typography>
              <Typography variant="text" tag="p">
                Under the personal data of the Citizen is understood the
                following information: general information (name and e-mail
                address, telephone number).
              </Typography>
              <Typography variant="text" tag="p">
                Citizen, by accepting this Agreement, express their interest and
                full consent that the processing of their personal data may
                include the following actions: collection, systematization,
                accumulation, storage, clarification (update, modification),
                use, destruction.
              </Typography>
              <Typography variant="text" tag="p">
                The Citizen guarantees: the information provided by him is
                complete, accurate and reliable; when providing information does
                not violate the current legislation of the Russian Federation,
                the legal rights and interests of third parties; all the
                information provided is filled out by the Citizen in respect of
                himself personally.
              </Typography>
            </DialogDescription>
            <DialogClose>Close</DialogClose>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger>Use of cookies</DialogTrigger>
          <DialogContent>
            <DialogHeading>Use of cookies</DialogHeading>
            <DialogDescription style={{ maxWidth: '600px' }}>
              <Typography variant="text" tag="p">
                About cookies
              </Typography>
              <Typography variant="text" tag="p">
                All web pages on this website use cookies. By using this website
                and agreeing to this policy, you authorize the use of cookies in
                accordance with the terms of this policy.
              </Typography>

              <Typography variant="text" tag="p">
                Cookies are transmitted by web servers to web browsers and
                stored by the latter.
              </Typography>

              <Typography variant="text" tag="p">
                The information is then sent back to the server each time the
                browser requests a page from the server. This allows the web
                server to identify and track web browsers.
              </Typography>

              <Typography variant="text" tag="p">
                There are two main types of cookies: session cookies and
                persistent cookies.
              </Typography>

              <Typography variant="text" tag="p">
                - Session cookies are deleted from your computer as soon as you
                close your browser.
              </Typography>
              <Typography variant="text" tag="p">
                - Persistent cookies are stored on your computer until they are
                deleted or expire.
              </Typography>

              <Typography variant="text" tag="p">
                Cookies
              </Typography>
              <Typography variant="text" tag="p">
                The use of cookies on this website is for the following
                purposes:
              </Typography>

              <Typography variant="text" tag="p">
                - collecting data about the user through the means of
                Yandex.Metric;
              </Typography>
              <Typography variant="text" tag="p">
                - enabling the publication of content on social networks;
              </Typography>
              <Typography variant="text" tag="p">
                - displaying recommendations for the user if he or she has
                already visited this website;
              </Typography>
            </DialogDescription>
            <DialogClose>Close</DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </footer>
  )
}
