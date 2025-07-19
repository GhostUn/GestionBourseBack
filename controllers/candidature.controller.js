const Candidature = require('../model/candidature.model');

const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const axios = require('axios');

exports.creationCandidature = async (req, res) => {
console.log('req.body.password', req.body.nomEt)
  try {

    
    
    const newCandidature= await Candidature.createCandidature(req.body);
    console.log('first', newCandidature)
    res.status(201).json(newCandidature);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.showBourse = async (req, res) => {
  const bourses = await Bourse.findAll();
  console.log('bourses', bourses)
  res.json(bourses);
};

exports.getBourseById = async (req, res) => {
  try {
    const { id } = req.params
    const bourse = await Bourse.findByPk(id)

    if (!bourse) {
      return res.status(404).json({ message: 'Bourse non trouvée' })
    }

    res.json(bourse)
  } catch (error) {
    console.error('Erreur backend :', error)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

const Paiement = async (amount, phoneNumber, email) => {
  const reference = 'REF' + Date.now();

  try {
    const response = await fetch('https://api.lygosapp.com/v1/gateway', {
      method: 'POST',
      headers: {
        'api-key': process.env.LYGOS_PUBLIC_KEY, // 🔐 Remplace par ta vraie clé
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: 1000,
        shop_name: 'Test Bourse University',
        message: "400",
        success_url: 'https://ton-site.com/paiement-success',
        failure_url: 'https://ton-site.com/paiement-echec',
        order_id: reference
      })
    });

        const result = await response.json();
        console.log('Réponse Lygos:', result);
      // Vérifie si la requête a réussi
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

          // Retourne un objet contenant redirectUrl
        if (result.link) {
          return { success: true, redirectUrl: result.link.trim() };
        } else {
          throw new Error("Le lien de paiement n'est pas disponible dans la réponse.");
        }

  } catch (error) {
    console.error('Erreur lors de l’appel à Lygos:', error);
    return { success: false, error: error.message };
  }
};


 /*exports.postuler = async (req, res) => {
  console.log('📝 Données reçues:', req.body, req.files);

  try {
    const {
      nomEt,
      email, 
      phoneNumber,
      modePaiement,
      pays,
      amount,
      nombourse
    } = req.body;

    if (!nomEt || !email || !modePaiement) {
      return res.status(400).json({ message: 'Champs obligatoires manquants ICI au controller' });
    }
    // Appel réel à Lygos
    const paiement = await Paiement(amount, phoneNumber, email);
 
   

    const candidature = await Candidature.create({
      nomEt,
      nombourse,
      email,
      phoneNumber,
      modePaiement,
      pays,
      amount,
      statutPaiement: 'en cours',
      referencePaiement: paiement.reference,
      cv: req.files['cv']?.[0]?.filename,
      DiplomeRequis: req.files['DiplomeRequis']?.[0]?.filename,
      denierDiplome: req.files['denierDiplome']?.[0]?.filename,
      lettreRecommandation: req.files['lettreRecommandation']?.[0]?.filename,
    });

    // Génération du reçu
    const doc = new PDFDocument();
    const filename = `recu-${candidature.id}.pdf`;
    const filepath = path.join(__dirname, '..', 'uploads', 'recus', filename);

    doc.pipe(fs.createWriteStream(filepath));
    doc.fontSize(18).text('Reçu de Paiement - Candidature Bourse', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Nom : ${candidature.nomEt}`);
    doc.text(`Email : ${candidature.email}`);
    doc.text(`Montant payé : ${candidature.amount} FCFA`);
    doc.text(`Paiement via : ${candidature.modePaiement}`);
    doc.text(`Référence : ${candidature.referencePaiement}`);
    doc.text(`Date : ${new Date().toLocaleString()}`);
    doc.end();

    res.status(201).json({
      message: 'Candidature enregistrée. Redirection vers le paiement...',
      recuUrl: `http://localhost:3003/uploads/recus/${filename}`,
      payment_url: paiement.payment_url
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
*/



/*exports.postuler = async (req, res) => {
  console.log('📝 Données reçues:', req.body, req.files);

  try {
    const {
      nomEt,
      email,
      phoneNumber,
      modePaiement,
      pays,
      amount,
      nombourse
    } = req.body;

    // Validation des champs obligatoires
    if (!nomEt || !email || !modePaiement) {
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }

    // Appel à l'API Lygos pour initier le paiement
    const paiement = await Paiement(amount, phoneNumber, email);
    if (!paiement.success) {
      console.error('Échec du paiement :', paiement.error);
      return res.status(500).json({ error: paiement.error });
    }
    console.log('paiement', paiement)

    // Création de la candidature dans la base de données
    const candidature = await Candidature.create({
      nomEt,
      nombourse,
      email,
      phoneNumber,
      modePaiement,
      pays,
      amount,
      statutPaiement: 'en cours',
      referencePaiement: paiement.reference,
      cv: req.files['cv']?.[0]?.filename,
      DiplomeRequis: req.files['DiplomeRequis']?.[0]?.filename,
      denierDiplome: req.files['denierDiplome']?.[0]?.filename,
      lettreRecommandation: req.files['lettreRecommandation']?.[0]?.filename,
    });

    // Génération du reçu PDF
    const doc = new PDFDocument();
    const filename = `recu-${candidature.id}.pdf`;
    const filepath = path.join(__dirname, '..', 'uploads', 'recus', filename);

    doc.pipe(fs.createWriteStream(filepath));
    doc.fontSize(18).text('Reçu de Paiement - Candidature Bourse', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Nom : ${candidature.nomEt}`);
    doc.text(`Email : ${candidature.email}`);
    doc.text(`Montant payé : ${candidature.amount} FCFA`);
    doc.text(`Paiement via : ${candidature.modePaiement}`);
    doc.text(`Référence : ${candidature.referencePaiement}`);
    doc.text(`Date : ${new Date().toLocaleString()}`);
    doc.end();

    // Redirection vers le lien de paiement après création de la candidature
    console.log('Redirection vers le lien de paiement...');
     res.status(201).json({
      message: 'Candidature enregistrée. Redirection vers le paiement...',
      recuUrl: `http://localhost:3003/uploads/recus/${filename}`, // Assurez-vous que cette route est accessible
      payment_url: paiement.link
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};*/

exports.postuler = async (req, res) => {
  console.log('📝 Données reçues:', req.body, req.files);

  try {
    const {
      nomEt,
      email,
      phoneNumber,
      modePaiement,
      pays,
      amount,
      nombourse
    } = req.body;

    // Validation des champs obligatoires
    if (!nomEt || !email || !modePaiement) {
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }

    // Appel à l'API Lygos pour initier le paiement
    const paiement = await Paiement(amount, phoneNumber, email);
    if (!paiement.success) {
      console.error('Échec du paiement :', paiement.error);
      return res.status(500).json({ error: paiement.error });
    }

    // Création de la candidature dans la base de données
    const candidature = await Candidature.create({
      nomEt,
      nombourse,
      email,
      phoneNumber,
      modePaiement,
      pays,
      amount,
      statutPaiement: 'en cours',
      referencePaiement: paiement.reference,
      cv: req.files['cv']?.[0]?.filename,
      DiplomeRequis: req.files['DiplomeRequis']?.[0]?.filename,
      denierDiplome: req.files['denierDiplome']?.[0]?.filename,
      lettreRecommandation: req.files['lettreRecommandation']?.[0]?.filename,
    });

    // Génération du reçu PDF
    const doc = new PDFDocument();
    const filename = `recu-${candidature.id}.pdf`;
    const filepath = path.join(__dirname, '..', 'uploads', 'recus', filename);

    doc.pipe(fs.createWriteStream(filepath));
    doc.fontSize(18).text('Reçu de Paiement - Candidature Bourse', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Nom : ${candidature.nomEt}`);
    doc.text(`Email : ${candidature.email}`);
    doc.text(`Montant payé : ${candidature.amount} FCFA`);
    doc.text(`Paiement via : ${candidature.modePaiement}`);
    doc.text(`Référence : ${candidature.referencePaiement}`);
    doc.text(`Date : ${new Date().toLocaleString()}`);
    doc.end();

    // Redirection vers le lien de paiement après création de la candidature
    console.log('Redirection vers le lien de paiement...');
    res.status(201).json({
      message: 'Candidature enregistrée. Redirection vers le paiement...',
      recuUrl: `http://localhost:3003/uploads/recus/${filename}`, // URL du reçu PDF
      payment_url: paiement.redirectUrl // Utilisez redirectUrl ici
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};