/*
  EDIT YOUR WEBSITE TEXT HERE

  Change text inside quotes for titles and navigation labels.
  Write page content between the backticks (`) after body.
  You can use multiple lines, blank lines, and bullet characters (•).
  Empty bodies stay blank on the website.

  Keep the punctuation outside the text in place.
  Leave each slug alone unless you want to change its page URL.
*/

export const site = {
  title: "Quantum Computation Project",

  outline: {
    title: "Outline",
    navigationLabel: "Outline",
    body: `
The website will follow similar structure to 15-455's introduction to circuit computation and complexity. In lecture for UCT, boolean circuits were introduced in the following way:

motivation -> basic definitions -> circuit families -> complexity classes -> main theorems -> computational power

I want to mirror this setup, but for quantum circuits rather than traditional circuits. So, my site will have the following pages in the following order:

Motivation: 
This section will contain a review of traditional circuits that we learned in 15-455, and will briefly discuss the history of quantum circuits, why we are interested in them, and what makes them Unique. We will discuss questions like "What is quantum computing?", "Why do we care about it?" "Why use quantum circuits rather than quantum TMs?" "How is quantum computation different than random computation?" and a few other things. 

Basic Definitions: 
We will define the core definitions needed to understand quantum circuits and quantum computations. We will define the core definitions of quantum circuits like qubits, super position, probability/amplitude of states, quantum specific gates, what it means to "solve" a problem with a quantum circuit. 

Circuit families: 
We will start by expanding our basic definitions to include how we define complexity of quantum circuits, quantum circuit depth, quantum circuit size, and how we measure them. We will discuss how we can solve decision problems (like the problems we solved with TMs) with quantum circuits by bypassing the uniformity issues that circuits present (similar to how we defined uniform circuit families), using a BPP algorithm to construct a quantum circuit. 

Complexity classes: 
On this page we will define quantum complexity classes similar to how we define classes in 15-455. First, they will be introduced without any understanding of whether they are useful definitions, then we will discuss basic containment between quantum classes and classical classes. Finally, we will discuss unknown containments and whether a quantum hierarchy theorem exists.

Main theorems: 
This page will discuss (and provide simple proofs for) important theorems regarding quantum computation. Proofs for the containments will be proved from the previous page, and one important theorem (that I will decide on later, but may be the theorem that BQP is contained in PSPACE) will be introduced and proved. Any other important facts that are vital to the next section will also be introduced, but may not be proved.

computational power: 
Here we will conclude quantum circuits by using the theorems and facts seen and proved in prior pages to draw conclusions about how much power we can truly expect to get out of quantum computation. We will discuss open problems like "Is BPP=BQP?" "Is NP contained in BQP?" etc. We will discuss what makes the open problems so challenging, and what we will learn if they are proved/disproved. We will discuss the known limitations of quantum computing, and quantum computing becomes even more limited if unproved theorems turn out to be true (as many expect).

`

,
  },

  // Copy a section object to add a page, or delete one to remove it.
  // Each section needs its own unique slug.
  sections: [
    {
      slug: "section-1",
      title: "Section 1",
      navigationLabel: "Section 1",
      body: ``,
    },
    {
      slug: "section-2",
      title: "Section 2",
      navigationLabel: "Section 2",
      body: ``,
    },
    {
      slug: "section-3",
      title: "Section 3",
      navigationLabel: "Section 3",
      body: ``,
    },
  ],

  // Small interface labels; normally these can stay as they are.
  interface: {
    skipToContent: "Skip to content",
    navigationLabel: "Main navigation",
    pageNotFound: "Page not found",
  },
};
