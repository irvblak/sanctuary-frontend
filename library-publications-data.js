/*
  Sanctuary Club
  library-publications-data.js

  CONTENT SOURCE FOR LIBRARY ITEMS

  Members do not need to know whether an item is technically
  a Notice or a maintained Publication.

  The Library simply indexes the title and opens the item.

  Internal "kind" is retained because it may later help the
  system decide how an item is maintained, archived or withdrawn.

  privacy:
    "access" = available through What's On / Library
    "pin"    = Personal PIN required
    "role"   = appropriate additional authority required

  Published material is Withdrawn rather than Deleted.

  One item — one source.
*/

window.SANCTUARY_LIBRARY_PUBLICATIONS = {

  /*
    =========================================================
    WELCOME TO SANCTUARY CLUB
    =========================================================
  */

  "welcome": {
    kind: "notice",

    title: "Welcome to Sanctuary Club",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "18 August 2026",

    summary:
      "A short introduction to Sanctuary Club and the different ways in.",

    body: `
      <p class="lead">
        Welcome. Have a look around and see what’s happening at Sanctuary.
      </p>

      <p>
        Through <strong>What’s On / Library</strong> you can see Events,
        News &amp; Notices and generally available Library material.
      </p>

      <p>
        <strong>There’s more inside.</strong>
        Some Club information and facilities are private to Sanctuary members.
      </p>

      <p>
        To see these, return Home, choose <strong>Access All</strong>,
        and enter your Membership Number and Personal PIN.
      </p>

      <p>
        Not quite ready for that yet?
        If you would like a little help getting started,
        just ask one of our Website Helpers.
      </p>
    `
  },


  /*
    =========================================================
    YOUR PRIVACY AT SANCTUARY
    Short signpost to the fuller Privacy & Security publications
    =========================================================
  */

  "privacy-intro": {
    kind: "notice",

    title: "Your Privacy at Sanctuary",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "18 August 2026",

    summary:
      "A short introduction to privacy and protected information around Sanctuary Club.",

    body: `
      <p class="lead">
        Your privacy matters.
      </p>

      <p>
        Sanctuary Club is designed so that generally useful information
        remains easy to see, while personal and protected material
        requires the appropriate access.
      </p>

      <p>
        Your Personal PIN protects member-only information and facilities.
        Where information needs an even smaller audience,
        appropriate additional authority can be required.
      </p>

      <p>
        Administrators do not need to know your Personal PIN,
        and privacy is built into the way the Club works
        rather than added afterwards.
      </p>

      <p>
        For a simple practical explanation, return to the Library and choose
        <strong>Your Access &amp; Privacy — at a Glance</strong>.
        For the fuller explanation, choose
        <strong>Privacy, Security &amp; Data Protection Notice</strong>.
      </p>
    `
  },


  /*
    =========================================================
    TAKING PART IN SANCTUARY CLUB
    =========================================================
  */
     "taking-part": {
    kind: "publication",

    title: "Taking Part in Sanctuary Club",

    privacy: "access",

    body: `
      <p class="lead">
        <strong><em>
          There are many ways to take part — Contact a Website Helper or Admin.
        </em></strong>
      </p>

      <h2>
        Needed
      </h2>

      <p>
        <strong>Website Helpers</strong>
        to encourage and assist members and newcomers to join in and use the website.
      </p>

      <p>
        <strong>Committee Members</strong>
        to discuss and decide how to structure Sanctuary Club and make best use of the website's power to aid the community.
      </p>

      <p>
        <strong>Role Players</strong>
        There is a lot of scope for members to take on roles such as Editor, Art teacher (using the Studio) etc.
      </p>

      <p>
        <strong>New Ideas</strong>
        Again, plenty of scope for your thoughts on how the power of the website can be used for education and enjoyment.
      </p>
    `
  },
  

  /*
    =========================================================
    PLEASE CHECK YOUR INFORMATION
    Intended particularly for the hand-over period
    =========================================================
  */

  "check-information": {
    kind: "notice",

    title: "Arrived here from What's On/wxyz?",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "18 August 2026",
    
    body: `
      <p class="lead">
        If you are ready to use the private member facilities,
        please enter through <strong>Access All</strong> and create your personal PIN.
      </p>

      <p>
        Please contact a Website Helper if you need some assistance
      </p>

      <p>
        Your Personal PIN is there to protect your information.
      </p>
         `
  },


  /*
    =========================================================
    YOUR DESIGN STUDIO — QUICK GUIDE
    =========================================================
  */

  "design-studio-guide": {
    kind: "publication",

    title: "Your Design Studio — Quick Guide",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "18 August 2026",

    summary:
      "A printable guide to creating and arranging work in Your Design Studio.",

    body: `
      <p class="lead">
        Your Design Studio is designed to let you create
        by placing and arranging items directly on the page.
      </p>

      <p>
        You do not need publishing or technical experience.
        Try things, move them around and change them
        until the page looks the way you want.
      </p>

      <div class="tip">
        <strong>Tip:</strong>
        Print this guide and keep it beside you while you are working.
      </div>

      <h2>Creating your design</h2>

      <h3>Add Text</h3>

      <p>
        Choose <strong>Add Text</strong> whenever you want words on the page.
      </p>

      <p>The same text box can be used for:</p>

      <ul>
        <li>a main title</li>
        <li>a heading</li>
        <li>ordinary text</li>
        <li>a short announcement</li>
        <li>captions or other wording</li>
      </ul>

      <p>
        Once the text box is selected, use the appearance controls
        to change its size, style, colour and alignment.
      </p>

      <p>
        There is no separate <strong>Add Title</strong> button.
        A title is simply a text box styled as a title
        and placed wherever you want it on the page.
      </p>

      <h3>Add Illustration</h3>

      <p>
        Choose <strong>Add Illustration</strong> when you want a picture.
      </p>

      <p>
        Illustrations come from your own saved files.
        This might be a photograph, something you have created yourself,
        or an illustration you have generated or downloaded
        and saved on your computer.
      </p>

      <p>
        If you would like something special, it is well worth learning
        how to use AI — or another image-creation method —
        to make an illustration, save it to your computer,
        and then bring it into the Studio.
      </p>

      <p>
        The illustration appears as an object on your design
        and can then be positioned wherever you wish.
      </p>

      <h2>Moving things around</h2>

      <p>
        Text and illustration boxes are movable.
      </p>

      <p>To reposition something:</p>

      <ol>
        <li>Click and hold the box.</li>
        <li>Drag it to the position you want.</li>
        <li>Release the mouse button.</li>
        <li>The box stays where you leave it.</li>
      </ol>

      <h2>Selecting a box</h2>

      <p>
        Click a box to select it.
      </p>

      <p>
        The editing controls then apply to
        <strong>that selected box only</strong>.
      </p>

      <p>
        You can select another box simply by clicking it.
      </p>

      <h2>Overlay and Underlay</h2>

      <p>
        Sometimes two boxes may overlap.
      </p>

      <p>
        Select the box you want to alter, then choose:
      </p>

      <p>
        <strong>Overlay</strong><br>
        Moves the selected box above the overlapping box.
      </p>

      <p>
        <strong>Underlay</strong><br>
        Moves the selected box underneath the overlapping box.
      </p>

      <p>
        Overlay and Underlay do not change the position
        or size of the box.
        They change only which item appears on top.
      </p>

      <h2>Delete</h2>

      <p>
        <strong>Delete</strong> removes the box
        you currently have selected.
      </p>

      <p>
        The Studio will ask you to confirm:
      </p>

      <p>
        <strong>Remove this item?</strong>
      </p>

      <p>
        Choose <strong>Remove</strong> to delete it
        or <strong>Keep</strong> to leave it unchanged.
      </p>

      <h2>Recover Draft</h2>

      <p>
        If you previously started a design but did not finish it,
        choose <strong>Recover Draft</strong>.
      </p>

      <p>
        This brings your unfinished work back into the Studio
        so that you can continue where you left off.
      </p>

      <h2>Save to my computer</h2>

      <p>
        Choose <strong>Save to my computer</strong>
        when you want to keep an editable copy
        of your Design Studio work on your own computer.
      </p>

      <p>
        You can later open that saved work again
        in Your Design Studio and continue editing it.
      </p>

      <p>
        Work created through <strong>Just for fun</strong>
        can also be saved this way.
        If it is later opened through full YDS after entering through
        <strong>Access All</strong>, it is treated as a new Writer or Artist
        creation and will require editorial approval before publication.
      </p>

      <h2>Preview</h2>

      <p>
        Choose <strong>Preview</strong> to see the design
        without the Design Studio editing controls.
      </p>

      <p>
        This lets you check the finished appearance
        before printing or publishing.
      </p>

      <h2>Print</h2>

      <p>
        Choose <strong>Print</strong> when you want a paper copy.
      </p>

      <p>
        The design is intended to print cleanly on A4.
      </p>

      <p>
        This Guide explains how to use the design tool itself.
        What happens to finished work — including publication,
        editorial approval, privacy and Library destinations —
        is explained in
        <strong>Your Design Studio — Publishing Guide</strong>.
      </p>

      <div class="motto">
        <strong>
          The computer does the thinking.<br>
          You do the creating.
        </strong>
      </div>
    `
  },


  /*
    =========================================================
    YOUR DESIGN STUDIO — PUBLISHING GUIDE
    =========================================================
  */

  "design-studio-publishing": {
    kind: "publication",

    title: "Your Design Studio — Publishing Guide",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "22 September 2026",

    summary:
      "What happens to work created in Your Design Studio and where it may go.",

    body: `
      <p class="lead">
        Choose the role you are carrying out, then choose
        <strong>Calendar</strong>, <strong>Library</strong> or <strong>School</strong>.
        The same Design Studio is used for every role.
      </p>

      <p>
        The website uses your role and any activity or subject you selected
        to file the finished work automatically.
      </p>

      <h2>While you are working</h2>

      <p>
        Name the work and use <strong>My Vault</strong> to keep it private and editable.
        Return to the Vault whenever you want to continue.
      </p>

      <h2>Events</h2>

      <p>
        An Event may be free or payable.
        If it is payable, the appropriate payment information is added
        as part of the Event process.
      </p>

      <p>
        Enter the Event facts first, then continue to Notice Design.
        Nothing is visible to members until you publish.
      </p>

      <p>
        Publishing makes the Calendar entry, Events List entry and linked Notice
        live together. Booking information is used automatically where required.
      </p>

      <h2>Activities</h2>

      <p>
        Choose <strong>Calendar</strong> for a dated Activity.
        It follows the same Calendar, Events List and Notice route as an Event.
      </p>

      <p>
        Choose <strong>Library</strong> for interesting or lasting Activity material,
        or <strong>School</strong> for guides, lessons and manuals.
        It is filed automatically under that Activity.
      </p>

      <h2>Writers and Artists</h2>

      <p>
        Writer and Artist work remains private while it is being created.
      </p>

      <p>
        If you decide that you would like to share it with your neighbours,
        you may submit it to a Club Editor.
      </p>

      <p>
        All Writer and Artist work intended for publication
        requires editorial approval.
      </p>

      <p>
        Approved Writer work is filed in the Reading Room.
        Approved Artist work is filed in the Gallery under Photo, Modern or Traditional.
      </p>

      <p>
        The Editor may return work for changes or approve it for publication.
        Once it is published, the contributor should receive
        an automatic confirmation.
      </p>

      <h2>Committee</h2>

      <p>
        Committee work uses the same Calendar, Library and School choices.
      </p>

      <p>
        The website files it under Committee News &amp; Information.
      </p>

      <h2>Residents Association Panel</h2>

      <p>
        Panel work uses the same Calendar, Library and School choices
        and is filed under Residents Association News &amp; Information.
      </p>

      <p>
        Apply the appropriate member-only protection before publishing
        material that should not be generally visible.
      </p>

      <h2>Privacy and publication</h2>

      <p>
        Where a privacy choice is genuinely needed,
        the Studio will offer only the choices appropriate
        to the work and to the authority of the person creating it.
      </p>

      <p>
        Material can be made more widely available where appropriate,
        but cannot be published into a more restricted area
        without the necessary authority.
      </p>

      <p>
        For instructions on using the design tool itself,
        see <strong>Your Design Studio — Quick Guide</strong>.
      </p>

      <div class="motto">
        <strong>
          The computer does the thinking.<br>
          You do the creating.
        </strong>
      </div>
    `
  },


  /*
    =========================================================
    YOUR ACCESS & PRIVACY — AT A GLANCE
    =========================================================
  */

  "access-privacy-glance": {
    kind: "publication",

    title: "Your Access & Privacy — at a Glance",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "18 August 2026",

    summary:
      "A simple practical guide to who can see what in Sanctuary Club.",

    body: `
      <p class="lead">
        Sanctuary Club has been designed to keep access simple
        while protecting information that is private.
      </p>

      <h2>The Sanctuary Access Code</h2>

      <p>
        The shared Access Code <strong>wxyz</strong> lets you enter
        the generally available parts of the website — including What’s On,
        News &amp; Notices and generally available Library information.
        It does <strong>not</strong> give access to members’ private information.
      </p>

      <h2>Your Personal PIN</h2>

      <p>
        Your own four-digit Personal PIN protects the information
        you choose to enter and gives you access to the private member areas
        of Sanctuary Club.
      </p>

      <p>
        Administrators cannot see, recover or tell you your Personal PIN.
      </p>

      <h2>The Members Database</h2>

      <p>
        The full members database has
        <strong>additional software protection</strong>
        and is not available through the ordinary member areas of the website.
      </p>

      <p>
        Access to the full database — including the facility used to email
        members who have registered an email address — is restricted to
        <strong>three members specifically appointed by the membership</strong>
        for that purpose.
      </p>

      <p>
        Other authorised role holders may have access to particular information
        needed for their responsibilities, but this does not give them access
        to the full members database.
      </p>

      <h2>Residents Association Panel</h2>

      <p>
        The Residents Association Panel has its own protected area.
        Access is restricted to those authorised to carry out
        the appropriate Residents Association responsibilities.
      </p>

      <h2>In simple terms</h2>

      <p>
        <strong>Access Code</strong> — generally available Club information.
      </p>

      <p>
        <strong>Personal PIN</strong> — your information and private member facilities.
      </p>

      <p>
        <strong>Authorised role</strong> — only the additional information
        needed for that responsibility.
      </p>

      <p>
        <strong>Full members database</strong> — additional software protection,
        with access restricted to the three appointed members.
      </p>

      <p>
        The principle is simple:
        generally useful Club information should be easy to see.
        Personal or protected information should be available only
        to the people who need it.
      </p>
    `
  },


  /*
    =========================================================
    PRIVACY, SECURITY & DATA PROTECTION CHARTER
    =========================================================
  */

  "privacy-security": {
    kind: "publication",

    title: "Privacy, Security & Data Protection Notice",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "23 September 2026",

    summary:
      "How Sanctuary Club protects members, their information and their privacy.",

    body: `
      <p><strong>Version 1.2 — 23 September 2026</strong></p>

      <p class="lead">
        This Notice explains what personal information Sanctuary Club holds,
        why it is needed, who may see it and how it is protected.
      </p>

      <h2>Conformity and Proportionate Protection</h2>

      <p>
        Sanctuary Club intends to handle personal information in accordance with
        the UK General Data Protection Regulation, the Data Protection Act 2018
        and the Data (Use and Access) Act 2025, together with any other
        data-protection rules applicable to its activities.
      </p>

      <p>
        The Information Commissioner’s Office (ICO) is the UK’s independent
        regulator for data protection. Sanctuary Club takes account of ICO
        guidance when establishing and reviewing its privacy and security arrangements.
      </p>

      <p>
        Sanctuary Club is a small, non-commercial community website holding a
        limited amount of information for identifiable Club and Residents
        Association purposes. Its safeguards are designed to be appropriate and
        proportionate to the nature, amount and sensitivity of that information
        and to the risks involved.
      </p>

      <p>
        This Notice records the safeguards and working procedures adopted for the
        website. It is not a claim that any computer system can be completely secure.
      </p>

      <h2>The Privacy Promise</h2>

      <p>Sanctuary Club:</p>

      <ul>
        <li>holds only the personal information reasonably needed to provide its facilities;</li>
        <li>uses it only for authorised Club purposes and, where separately authorised, Residents Association purposes;</li>
        <li>keeps private member services behind Personal PIN access;</li>
        <li>separates generally available Club information from personal and protected information;</li>
        <li>limits administrative and Role Holder access to what is needed for each responsibility;</li>
        <li>allows members to decide what optional contact information they provide and share;</li>
        <li>does not sell personal information or use it for commercial advertising or marketing.</li>
      </ul>

      <h2>Information Held</h2>

      <p>Depending on how a member uses Sanctuary Club, information may include:</p>

      <ul>
        <li>name;</li>
        <li>household Membership Number and individual resident reference;</li>
        <li>email address, telephone numbers and other contact information provided by the member;</li>
        <li>Club or Residents Association roles undertaken by the member;</li>
        <li>Event bookings, cancellations and related information;</li>
        <li>work created, saved or published through Your Design Studio;</li>
        <li>necessary administrative and security records.</li>
      </ul>

      <p>
        Only information reasonably required to operate the relevant facility is
        requested or retained. Members decide what optional contact information
        they provide and make available through the Members Directory.
      </p>

      <h2>How Information Is Used</h2>

      <p>Personal information may be used to:</p>

      <ul>
        <li>identify a member correctly and provide access to private services;</li>
        <li>maintain the Members Directory;</li>
        <li>organise Events and Activities and administer bookings;</li>
        <li>enable authorised Role Holders to carry out their responsibilities;</li>
        <li>send authorised Club or Residents Association information to members;</li>
        <li>maintain appropriate security and audit records;</li>
        <li>support and improve Sanctuary Club facilities.</li>
      </ul>

      <p>
        Information collected for Sanctuary Club is not used for unrelated purposes.
        Residents Association information is handled under the authority and
        safeguards appropriate to the Residents Association.
      </p>

      <h2>The Full Membership Database</h2>

      <p>
        The full membership database is used by the Club and the Residents
        Association Panel to send authorised information by email directly to members.
      </p>

      <p>
        Because it contains the combined membership and contact records, it has
        additional security beyond the ordinary member areas of the website.
        Access is restricted to specifically appointed Backend Administrators and
        is not available merely because a person holds another Club or Panel role.
      </p>

      <p>
        Authorised email information may be produced only for an approved Club or
        Residents Association communication. Access and administrative actions are
        recorded in the appropriate audit trail.
      </p>

      <h2>Who Can See Information?</h2>

      <ul>
        <li>Members may see information that other members have chosen to share through the Members Directory.</li>
        <li>Event Hosts may see only the booking and contact information needed to manage their own Events.</li>
        <li>Role Holders may see only the information needed for their authorised work.</li>
        <li>Club Administrators may carry out the member and role administration assigned to them.</li>
        <li>Backend Administrators have separately protected access to the full membership database and technical administration.</li>
        <li>Residents Association information is available only through the appropriate authorised route.</li>
      </ul>

      <p>
        Holding one role does not automatically provide access to information
        belonging to another role or responsibility.
      </p>

      <h2>The Starter PIN</h2>

      <p>
        Every new membership begins with the temporary Starter PIN
        <strong>2468</strong>. It must be replaced with a private four-digit
        household PIN before private member services are used.
      </p>

      <p>
        If a PIN is forgotten, the member may submit a reset request. A Club
        Administrator will independently confirm that the request is genuine
        before resetting the membership to 2468. The member must then choose a
        new private PIN.
      </p>

      <h2>The Private Membership PIN</h2>

      <ul>
        <li>Members should not disclose their PIN unnecessarily.</li>
        <li>Administrators cannot view, recover or tell a member their private PIN.</li>
        <li>A forgotten PIN can be replaced only through the authorised reset process.</li>
        <li>The temporary Starter PIN cannot be retained as the new private PIN.</li>
      </ul>

      <p>
        A PIN identifies the household membership. Where individual authority is
        required, the resident reference and appointed role are also checked.
      </p>

      <h2>Security Arrangements</h2>

      <p>Proportionate safeguards include:</p>

      <ul>
        <li>PIN-protected member access and separately protected Backend Administration;</li>
        <li>restricted permissions based on appointed responsibilities;</li>
        <li>separation of generally available, member-only and administratively protected information;</li>
        <li>password and PIN storage designed so that the original private value cannot simply be read;</li>
        <li>time-limited sessions and fresh sign-in where appropriate;</li>
        <li>appropriate activity and administrative audit records;</li>
        <li>controlled procedures for PIN resets and changes to personal information;</li>
        <li>review whenever facilities or data use change.</li>
      </ul>

      <p>
        Members also help by keeping their PIN private, signing out on shared
        devices and reporting anything that appears unusual.
      </p>

      <h2>Accuracy and Member Choice</h2>

      <p>Members may:</p>

      <ul>
        <li>see, correct or update their household information;</li>
        <li>choose what optional contact information they provide;</li>
        <li>change their private Membership PIN;</li>
        <li>ask what information is held and why;</li>
        <li>ask a Club Administrator about clearing their voluntary Your Information data.</li>
      </ul>

      <p>
        Where Your Information is cleared, it is cleared as a whole rather than
        selectively. Necessary security, booking, audit or administrative records
        may still need to be retained for their proper purpose.
      </p>

      <h2>Retention</h2>

      <p>
        Information is kept only for as long as reasonably needed for the facility
        or record concerned. Current Event information, booking records, published
        material, administrative records and audit information may therefore have
        different retention periods.
      </p>

      <h2>Questions or Concerns</h2>

      <p>
        A member should first raise any data-protection concern with a Club
        Administrator. It will be acknowledged within 30 days, investigated and
        answered without undue delay.
      </p>

      <p>
        If the member remains dissatisfied, they may complain directly to the
        Information Commissioner’s Office at
        <a href="https://ico.org.uk/" target="_blank" rel="noopener">ico.org.uk</a>.
      </p>

      <h2>Review and Responsibility</h2>

      <p>
        This Notice describes the safeguards and procedures applying at the date
        shown above. It must be reviewed whenever data use, access responsibilities,
        the website’s technical arrangements or the applicable rules materially change.
      </p>

      <p>
        <strong>
          Personal information should be available only to the people who need it,
          for an authorised purpose, and with protection appropriate to the
          information involved.
        </strong>
      </p>
    `
  
    },


  /*
    =========================================================
    THE WAY FORWARD
    Your Club & The Way Forward
    =========================================================
  */

  "the-way-forward": {
    kind: "publication",

    title: "The Way Forward",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "18 August 2026",

    summary:
      "The website has created new possibilities. How the Club is governed for the future belongs to its members.",

    body: `
      <div class="way-forward">

        <p class="lead">
          <strong>
            Sanctuary Club has created new possibilities for our community.
          </strong>
        </p>

        <p>
          The website is there to make life at Sanctuary
          <strong>easier, more enjoyable and more connected</strong>.
        </p>

        <p>
          It can help us organise events and activities, share news and information,
          communicate with one another, encourage creativity and keep useful
          Club information readily available.
        </p>

        <p>
          It can continue to develop as members discover what is useful
          and what they would like it to do.
        </p>

        <h2>
          But a website is a tool for a community.<br>
          It does not govern the community.
        </h2>

        <p>
          The time has come for <strong>the membership to decide how Sanctuary Club
          itself should be organised and governed for the future.</strong>
        </p>

        <p>
          That may include a Constitution; the structure and responsibilities
          of the Club Committee; how its members are chosen and how long they serve;
          how decisions are made and reported; and how the wider membership
          can participate.
        </p>

        <p>
          The Residents Association Panel has its own responsibilities
          and will have a separate protected area within Sanctuary Club,
          using the same software and facilities wherever they are appropriate.
        </p>

        <p>
          Members may, of course, undertake roles in both.
          People and experience can be shared while responsibilities,
          authority and protected information remain properly distinct.
        </p>

        <p>
          The website can make Club governance easier. It can provide information,
          publish notices and minutes, support meetings and voting,
          preserve an accessible record and help members take part.
        </p>

        <h2>
          It should not make those decisions.<br>
          Members should.
        </h2>

        <p>
          Nothing needs to be done simply because the technology makes it possible.
        </p>

        <p>
          Our arrangements should suit <strong>Sanctuary</strong>,
          remain proportionate to a community of our size and,
          above all, reflect what the membership wants.
        </p>

        <p class="lead">
          <strong>
            Sanctuary Club has provided some new possibilities.
          </strong>
        </p>

        <div class="motto">
          <strong>
            The way forward belongs to its members.
          </strong>
        </div>

      </div>
      `
  },


  /*
    =========================================================
    SANCTUARY CLUB ADMINISTRATION — WHO DOES WHAT?
    =========================================================
  */

  "administration-structure": {
    kind: "notice",

    title: "Sanctuary Club Administration — Who Does What?",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "12 September 2026",

    summary:
      "A simple explanation of the different administrative roles and how responsibility is shared and protected.",

    body: `
      <p class="lead">
        Sanctuary Club uses different kinds of administration for
        different purposes. They are deliberately kept separate so
        that people have the authority they need — and no more.
      </p>

      <h2>Club Administrators</h2>

      <p>
        <strong>Club Administrators (CA)</strong> look after the ordinary
        administration of Sanctuary Club through the website.
      </p>

      <p>
        Their responsibilities may include maintaining membership information,
        helping with PIN problems, allocating Club roles, dealing with members
        joining or leaving, and helping with the ordinary administration of
        Events, Activities and Club information.
      </p>

      <p>
        Club Administrators are themselves Sanctuary members.
      </p>

      <h2>Website Administrators</h2>

      <p>
        <strong>Website Administrators (WA)</strong> develop and look after
        the Sanctuary Club website itself.
      </p>

      <p>
        Their work may include maintaining and improving the website,
        correcting faults, developing new facilities, looking after its
        structure and technical services, and keeping sufficient information
        and documentation for its future development.
      </p>

      <p>
        An important part of Website Administration is continuity.
        A Website Administrator may work alongside another developer,
        share the work and knowledge involved, and in due course enable
        somebody else to take over responsibility for the website.
      </p>

      <p>
        Website Administrators can also provide a technical point of referral
        for Website Helpers when a problem goes beyond ordinary member help.
        Website Helpers remain a co-operative member-help network;
        the Website Administrator does not supervise or control them.
      </p>

      <p>
        Because Website Administrators may have powerful access to the website
        and its development facilities, Website Administration has its own
        separately protected access. Being shown as a Website Administrator
        in the Role Register identifies the office-holder to members;
        the Role Register entry does not itself provide technical access.
      </p>

      <h2>Backend Administrators</h2>

      <p>
        <strong>Backend Administrators (BA)</strong> safeguard the protected
        technical foundations and continuity of Sanctuary Club.
      </p>

      <p>
        There are three separately protected Backend Administrator offices:
        a Primary Backend Administrator and two Backup Backend Administrators.
        These are offices rather than permanent appointments to particular people.
      </p>

      <p>
        A Backend Administrator need not be involved in the everyday development
        of the website. The role exists particularly to ensure that protected
        technical control and recovery of the system do not depend upon one person.
      </p>

      <p>
        Backend Administration is kept separate from ordinary Club and
        Website Administration. A person may hold more than one of these
        responsibilities where appropriate, but one does not automatically
        confer another.
      </p>

      <h2>Changing a Backend Administrator</h2>

      <p>
        Normally, the appointment, removal or replacement of a Backend
        Administrator requires approval by
        <strong>two existing Backend Administrators</strong>.
      </p>

      <p>
        A new office-holder receives new protected credentials.
        A previous office-holder's credentials are not passed on.
      </p>

      <h2>Emergency safeguard</h2>

      <p>
        If fewer than two Backend Administrators remain available,
        the remaining Backend Administrator together with
        <strong>two current Residents Association Officers</strong>
        may authorise an emergency replacement.
      </p>

      <p>
        If no Backend Administrator remains available,
        <strong>three current Residents Association Officers</strong>
        may authorise recovery of one Backend Administrator office.
        The normal arrangements should then be restored as soon as practicable.
      </p>

      <p>
        Changes of Backend Administrator are recorded.
        Detailed recovery instructions, credentials and other sensitive
        technical information are kept separately in the protected
        Backend Administration area.
      </p>

      <h2>Keeping the responsibilities separate</h2>

      <p>
        A Club Administrator administers the Club using the website.
      </p>

      <p>
        A Website Administrator develops and looks after the website
        through which the Club operates.
      </p>

      <p>
        A Backend Administrator safeguards the protected technical
        foundations and recovery of the system.
      </p>

      <div class="motto">
        <strong>
          People should have the authority they need for their job —
          and no more.
        </strong>
      </div>

      <p>
        Keeping these responsibilities clear helps Sanctuary Club remain
        straightforward to run, properly protected and capable of being
        handed on safely in the future.
      </p>
    `
  }

};
