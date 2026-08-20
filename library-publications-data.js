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
        <strong>Privacy, Security &amp; Data Protection Charter</strong>.
      </p>
    `
  },


  /*
    =========================================================
    TAKING PART IN SANCTUARY CLUB
    =========================================================
  */

  "taking-part": {
    kind: "notice",

    title: "Taking Part in Sanctuary Club",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "18 August 2026",

    summary:
      "There are many ways to take part — as much or as little as you wish.",

    body: `
      <p class="lead">
       At home, in the clubhouse or out and about, Sanctuary Club is useful and enjoyable.
      </p>

      <p>
        You might Host an Event, organise an Activity,
        contribute news, write something, create artwork,
        help with the website — or simply enjoy what
        other members provide.
      </p>

      <p>
        There is no obligation to take on a role.
      </p>

      <p>
        If something interests you, the Club Roles section
        explains the possibilities and who can help.
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

    title: "Please Check Your Information",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "18 August 2026",

    summary:
      "A quick hand-over reminder for Sanctuary members.",

    body: `
      <p class="lead">
        When you are ready to use the private member facilities,
        please enter through <strong>Access All</strong> and check that
        Your Information is up to date.
      </p>

      <p>
        If you are still using the temporary Starter PIN,
        you will be asked to replace it with your own Personal PIN
        before opening private member services.
      </p>

      <p>
        Your Personal PIN is there to protect your information
        and the member-only parts of Sanctuary Club.
      </p>

      <p>
        If you would like a little help getting started,
        ask one of our Website Helpers.
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

    updated: "18 August 2026",

    summary:
      "What happens to work created in Your Design Studio and where it may go.",

    body: `
      <p class="lead">
        Your Design Studio uses one common design tool.
        The route you choose before entering the Studio tells the computer
        what kind of work you are creating and what may happen to it afterwards.
      </p>

      <p>
        Wherever the correct destination is already known,
        the computer should make that decision automatically.
        You should be asked to choose only when there is a genuine choice to make.
      </p>

      <h2>Your work while you create it</h2>

      <p>
        You can use the Studio simply for your own pleasure.
        You may print your work or save an editable copy to your computer
        without publishing it anywhere.
      </p>

      <p>
        If you think you may want to submit your work later,
        you may also keep a draft so that you can return to it.
      </p>

      <h2>Events</h2>

      <p>
        An Event may be free or payable.
        If it is payable, the appropriate payment information is added
        as part of the Event process.
      </p>

      <p>
        While an Event is current, it can appear automatically in the
        Calendar, Events List and Event Notices.
      </p>

      <p>
        After the Event date it disappears from the current displays.
        A compact Events List-style record may remain permanently
        in the Library archive.
      </p>

      <h2>Activities</h2>

      <p>
        A dated Activity may appear in the Calendar, Events List
        and Notices while it is current.
      </p>

      <p>
        General information about an Activity may instead become
        an editable standing publication in the appropriate Library section.
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
        Approved Writer work may appear as current News
        or become a permanent Library publication.
        Approved Artist work may be included in the Library Gallery.
      </p>

      <p>
        The Editor may return work for changes or approve it for publication.
        Once it is published, the contributor should receive
        an automatic confirmation.
      </p>

      <h2>Committee</h2>

      <p>
        Committee News &amp; Notices use the same Design Studio framework
        and the same publishing facilities wherever they are appropriate.
      </p>

      <p>
        The type of material being created determines its destination,
        privacy and whether it forms part of the permanent Library record.
      </p>

      <h2>Residents Association Panel</h2>

      <p>
        Residents Association Panel work is a separate protected area.
        Wherever practical it can use the same Sanctuary Club software
        and facilities, while keeping its own authority, privacy
        and records distinct.
      </p>

      <p>
        The detailed publishing arrangements for the Residents Association Panel
        will be determined separately.
      </p>

      <h2>Services</h2>

      <p>
        Dated Service information may be treated like an Event while current.
        Standing Service information may remain as an editable Library publication.
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

    title: "Privacy, Security & Data Protection Charter",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "18 August 2026",

    summary:
      "How Sanctuary Club protects members, their information and their privacy.",

    body: `
      <p class="lead">
        <strong>
          Built on neighbourly trust. Designed to grow responsibly.
        </strong>
      </p>

      <p>
        <strong>Version 1.1</strong>
      </p>

      <h2>Our Privacy Promise</h2>

      <p>
        Privacy and security are built into Sanctuary Club,
        not added as an afterthought.
        The website has been designed specifically for our community
        so that members can enjoy its benefits without having to understand
        the technology protecting them.
      </p>

      <p>
        Personal information is kept behind Personal PIN access;
        generally available Club information is deliberately separated
        from private member information; administrative powers are restricted;
        and only the information needed to provide each Club facility
        is used or displayed.
      </p>

      <p>
        Sanctuary Club has been created by members, for members.
        Its purpose is to strengthen our community, make it easier to organise
        activities and events, improve communication and provide useful
        information for everyone who belongs to the Club.
      </p>

      <p>
        We do not make extravagant claims about security.
        Our aim is to provide sensible, proportionate protection
        which is continually reviewed as Sanctuary Club develops,
        so that members can use the Club comfortably and with confidence.
      </p>

      <h2>Our Principles</h2>

      <p>Sanctuary Club is committed to:</p>

      <ul>
        <li>
          collecting only the minimum personal information needed
          to operate the Club;
        </li>

        <li>
          using personal information only for legitimate Sanctuary Club
          purposes and, where separately authorised,
          Residents Association purposes;
        </li>

        <li>
          protecting personal information through appropriate technical
          and organisational safeguards;
        </li>

        <li>
          restricting access to information according to authorised
          responsibilities;
        </li>

        <li>
          being open and transparent about what information is held
          and why it is needed;
        </li>

        <li>
          continually reviewing and improving our privacy and security
          arrangements.
        </li>
      </ul>

      <p>
        Sanctuary Club is a community service.
      </p>

      <p>
        It has not been created for commercial purposes, advertising or marketing,
        and members’ personal information is never sold or shared for
        commercial gain.
      </p>

      <h2>The Starter PIN</h2>

      <p>
        Every new membership begins with the temporary Starter PIN
        <strong>2468</strong>.
      </p>

      <p>
        If you forget your Personal PIN, you can use the
        <strong>Forgotten your PIN?</strong> facility to restore
        the temporary Starter PIN automatically.
      </p>

      <p>
        Where a surname is already recorded, you will be asked for it
        as a simple check of the membership details.
        If no surname has yet been recorded, your Membership Number is sufficient.
      </p>

      <p>
        After signing in with the Starter PIN,
        you will be asked to choose your own new Personal PIN
        before using private member services.
      </p>

      <h2>Your Personal PIN</h2>

      <p>
        Your Personal PIN protects access to your private member services.
      </p>

      <p>For your security:</p>

      <ul>
        <li>
          only you should know your Personal PIN;
        </li>

        <li>
          Administrators cannot view, recover or tell you your Personal PIN;
        </li>

        <li>
          if your PIN is forgotten, it can only be reset to the temporary
          Starter PIN, allowing you to choose a new Personal PIN.
        </li>
      </ul>

      <p>
        This approach has been deliberately chosen so that no Administrator
        can know or recover a member’s Personal PIN.
      </p>

      <h2>What Information Is Held?</h2>

      <p>
        Depending upon how you use Sanctuary Club, information may include:
      </p>

      <ul>
        <li>your name;</li>
        <li>your member reference;</li>
        <li>your household Membership Number;</li>
        <li>your contact details, where you choose to provide them;</li>
        <li>the voluntary Club roles you undertake;</li>
        <li>event bookings and related information.</li>
      </ul>

      <p>
        Information connected specifically with Residents Association business
        is handled within the appropriate separately protected arrangements.
      </p>

      <p>
        Only information reasonably required to operate Sanctuary Club is held.
      </p>

      <p>
        Members remain free to decide how much optional contact information
        they wish to provide.
      </p>

      <h2>How Your Information Is Used</h2>

      <p>
        Your Club information is used only for purposes connected
        with Sanctuary Club.
      </p>

      <p>Typical examples include:</p>

      <ul>
        <li>identifying members correctly;</li>
        <li>organising events and activities;</li>
        <li>administering bookings;</li>
        <li>
          enabling authorised volunteers to carry out their responsibilities;
        </li>
        <li>
          helping members communicate with one another where appropriate;
        </li>
        <li>improving the services provided by Sanctuary Club.</li>
      </ul>

      <p>
        Personal information is never used for commercial marketing
        or unrelated purposes.
      </p>

      <h2>Who Can See Your Information?</h2>

      <p>
        Most personal information is available only to Sanctuary members
        after secure sign-in.
      </p>

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
        Other authorised role holders may have access only to the particular
        information needed to carry out their responsibilities.
        This does not give them access to the full members database.
      </p>

      <p>
        Residents Association Panel information is protected separately
        and is available only to those with the appropriate authority.
      </p>

      <h2>Looking After Your Information</h2>

      <p>
        Sanctuary Club uses reasonable technical and organisational measures
        to help protect personal information from unauthorised access, misuse,
        accidental loss or inappropriate disclosure.
      </p>

      <p>
        As the Club develops, its security arrangements and operating procedures
        will continue to be reviewed and strengthened wherever appropriate.
      </p>

      <h2>Your Rights</h2>

      <p>Members are entitled to:</p>

      <ul>
        <li>
          know what personal information Sanctuary Club holds about them;
        </li>

        <li>
          ask for inaccurate information to be corrected;
        </li>

        <li>
          change their own Personal PIN at any time;
        </li>

        <li>
          ask questions about how their information is used.
        </li>
      </ul>

      <p>
        Questions or concerns will always be treated respectfully, fairly
        and as promptly as possible.
      </p>

      <h2>Looking Ahead</h2>

      <p>
        Sanctuary Club is intended to grow alongside our community.
      </p>

      <p>
        New facilities and services will continue to be developed,
        but privacy, security and responsible stewardship of members’
        information will remain fundamental design principles.
      </p>

      <p>
        This Charter reflects Sanctuary Club as it is today.
        It will be reviewed and updated as the Club develops
        so that members and those entrusted with Club responsibilities
        continue to benefit from good governance, clear policies
        and appropriate safeguards.
      </p>

      <h2>Our Commitment</h2>

      <p>
        <strong>
          Technology should help neighbours, not worry them.
        </strong>
      </p>

      <p>
        Everything we do will continue to be guided by that simple principle.
      </p>

      <p>
        Our aim is to strengthen our community while respecting every member’s
        privacy, dignity and trust.
      </p>

      <p>
        That is the commitment made by Sanctuary Club to every member,
        today and in the future.
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
  }

};
