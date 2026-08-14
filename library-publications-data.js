
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
    SANCTUARY ETHOS
    Previously developed as Sanctuary Creed
    =========================================================
  */

  "sanctuary-ethos": {
    kind: "publication",

    title: "Sanctuary Ethos",

    privacy: "access",

    approval: "direct",

    owner: "Sanctuary Club",

    updated: "14 August 2026",

    summary:
      "The principles and spirit that guide Sanctuary Club.",

    body: `
      <p class="lead">
        Sanctuary Club is designed by residents, for residents,
        to make community life easier, friendlier and more enjoyable.
      </p>

      <h2>Neighbourly before technical</h2>

      <p>
        Technology should help people take part in Club life,
        not get in their way.
      </p>

      <h2>Explain why</h2>

      <p>
        When something is protected or unavailable,
        the Club should explain why rather than simply say “No”.
      </p>

      <h2>One obvious way</h2>

      <p>
        Members should be able to find what they want
        without needing to understand how the website works.
      </p>

      <h2>People before features</h2>

      <p>
        New facilities should earn their place by making life
        easier or more enjoyable for residents.
      </p>

      <h2>Privacy by design</h2>

      <p>
        Information should be available to the people who need it,
        while personal and protected material remains private.
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
  }

};
