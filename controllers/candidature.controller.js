const Candidature = require('../model/candidature.model');

const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

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


exports.postuler = async (req, res) => {
   console.log('📝 Données reçues:', req.files);
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

    // Vérification
    if (!nomEt || !email || !modePaiement) {
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }

    // Paiement simulé
    const paiementReussi = true;
    if (!paiementReussi) {
      return res.status(400).json({ message: 'Échec du paiement' });
    }
    const montant = amount
    // Enregistrement en base
    const candidature = await Candidature.create({
      nomEt,
      nombourse,
      email,
      phoneNumber,
      modePaiement,
      pays,
      amount,
      statutPaiement: 'payé',
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
    doc.text(`Montant payé : ${candidature.montant} FCFA`);
    doc.text(`Paiement via : ${candidature.modePaiement}`);
    doc.text(`Date : ${new Date().toLocaleString()}`);
    doc.end();

    res.status(201).json({
      message: 'Candidature enregistrée avec succès',
      recuUrl: `http://localhost:3003/uploads/recus/${filename}`,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};