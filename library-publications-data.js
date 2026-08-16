
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

    updated: "14 August 2026",

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
        To see these, return Home, choose <strong>Info</strong>,
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
    Short signpost to the fuller Privacy & Security publication
    =========================================================
  */

  "privacy-intro": {
    kind: "notice",

    title: "Your Privacy at Sanctuary",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "14 August 2026",

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
        and privacy is intended to be built into the way the Club works
        rather than added afterwards.
      </p>

      <p>
        For the fuller explanation, return to the Library and choose
        <strong>Privacy &amp; Security</strong>.
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

    updated: "14 August 2026",

    summary:
      "There are many ways to take part — as much or as little as you wish.",

    body: `
      <p class="lead">
        Sanctuary Club works best when residents use it
        in whatever way suits them.
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

    updated: "14 August 2026",

    summary:
      "A quick hand-over reminder for Sanctuary members.",

    body: `
      <p class="lead">
        When you are ready to use the private member facilities,
        please enter through <strong>Info</strong> and check that
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

    updated: "14 August 2026",

    summary:
      "A printable guide to creating and arranging publications in Your Design Studio.",

    body: `
      <p class="lead">
        Your Design Studio is designed to let you create a publication
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


      <h2>Creating your publication</h2>


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
        The illustration appears as an object on your publication
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
        Because this cannot be undone accidentally,
        the Studio will ask you to confirm:
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
        If you previously started a publication but did not finish it,
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
        <strong>Info</strong>, it is treated as a new Writer or Artist
        creation and will require editorial approval before publication.
      </p>


      <h2>Preview</h2>

      <p>
        Choose <strong>Preview</strong> to see the publication
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
        The publication is designed to print cleanly on A4.
      </p>


      <h2>Publish</h2>

      <p>
        When you are satisfied with the finished publication,
        choose <strong>Publish</strong>.
      </p>

      <p>
        The Studio will give you a final opportunity
        to check your work.
      </p>

      <p>
        For most Club material, you will then be asked
        to choose the <strong>Privacy Level</strong>:
      </p>

      <ul>
        <li>
          <strong>Access Code</strong> —
          available to anyone who has entered Sanctuary Club
          through <strong>What’s On / Library</strong>.
        </li>

        <li>
          <strong>Personal PIN</strong> —
          available only to verified Sanctuary members.
        </li>
      </ul>

      <p>
        If your role gives you authority to publish more restricted material,
        the appropriate additional privacy choice will also be available.
      </p>

      <p>
        You may make your work more widely available,
        but you cannot publish into a more restricted area
        than your role permits.
      </p>

      <p>
        Some material already has a natural destination.
        For example, an Event may also appear automatically
        in the Calendar, Events List and Notices.
      </p>

      <p>
        In those cases the computer will do what it already knows
        needs to be done rather than ask you unnecessary questions.
      </p>


      <h3>Writers and Artists</h3>

      <p>
        Work created as a <strong>Writer</strong> or
        <strong>Artist</strong> remains behind closed doors
        while it is being prepared.
      </p>

      <p>
        It is not offered a Privacy Level at this stage.
      </p>

      <p>
        When it is ready, choose
        <strong>Submit for Publication</strong>.
      </p>

      <p>
        The work then goes for editorial approval
        before it is made available in the Library.
      </p>

      <p>
        The Editor may return the work for changes
        or approve and publish it.
      </p>

      <p>
        Once it is published, the contributor should receive
        an automatic confirmation.
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
    PRIVACY, SECURITY & DATA PROTECTION CHARTER
    =========================================================
  */

  "privacy-security": {
    kind: "publication",

    title: "Privacy, Security & Data Protection Charter",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "15 August 2026",

    summary:
      "How Sanctuary Club protects members, their information and their privacy.",

    body: `
      <p class="lead">
        <strong>
          Built on neighbourly trust. Designed to grow responsibly.
        </strong>
      </p>

      <p>
        <strong>Version 1.0</strong>
      </p>


      <h2>Our Privacy Promise</h2>

      <p>
        Sanctuary Club has been created by residents, for residents.
      </p>

      <p>
        Its purpose is to strengthen our community, make it easier to organise
        activities and events, improve communication and provide useful
        information for everyone who lives here.
      </p>

      <p>
        From the very beginning, Sanctuary Club has been designed with privacy,
        security and neighbourly trust as guiding principles.
      </p>

      <p>
        We believe residents should enjoy the benefits of modern technology
        without sacrificing their privacy or peace of mind.
      </p>

      <p>
        For that reason, every effort has been made to collect only the
        information needed to operate Sanctuary Club, to protect it appropriately,
        and to use it only for the benefit of our residents and community.
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
          and Residents Association purposes;
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
        and residents' personal information is never sold or shared for
        commercial gain.
      </p>


      <h2>The Starter PIN</h2>

      <p>
        Every new member begins with the temporary Starter PIN.
      </p>

      <p>
        The same Starter PIN is also used whenever an authorised Administrator
        resets a forgotten PIN.
      </p>

      <p>
        This provides a simple and familiar way for members to begin using
        Sanctuary Club or regain access if they forget their own Personal PIN.
      </p>

      <p>
        Before accessing private member services, members are asked to replace
        the Starter PIN with their own Personal PIN.
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
        can know or recover a member's Personal PIN.
      </p>


      <h2>What Information Is Held?</h2>

      <p>
        Depending upon how you use Sanctuary Club, information may include:
      </p>

      <ul>
        <li>your name;</li>
        <li>your resident reference;</li>
        <li>your household Membership Number;</li>
        <li>your contact details, where you choose to provide them;</li>
        <li>
          the voluntary Club or Residents Association roles you undertake;
        </li>
        <li>event bookings and related information.</li>
      </ul>

      <p>
        Only information reasonably required to operate Sanctuary Club is held.
      </p>

      <p>
        Members remain free to decide how much optional contact information
        they wish to provide.
      </p>


      <h2>How Your Information Is Used</h2>

      <p>
        Your information is used only for purposes connected with Sanctuary Club
        and the Residents Association.
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
        Access to administration functions is restricted to authorised
        Administrators and other authorised role holders.
      </p>

      <p>
        Different responsibilities are protected through role-based permissions
        so that individuals can access only the information needed to carry out
        their authorised duties.
      </p>

      <p>
        Sensitive Residents Association information will, where appropriate,
        be protected separately.
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
        New facilities and services will continue to be developed, but privacy,
        security and responsible stewardship of members' information will remain
        fundamental design principles.
      </p>

      <p>
        This Charter reflects Sanctuary Club as it is today.
        It will be reviewed and updated as the Club develops so that members,
        Administrators and the Residents Association continue to benefit
        from good governance, clear policies and appropriate safeguards.
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
        Our aim is to strengthen our community while respecting every member's
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
  }

};

