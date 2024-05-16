import type {
	ProcedureCallPacket,
	ResultSetHeader,
	RowDataPacket,
} from "mysql2";

import { pool } from "@/db/index";

export interface Transaction extends RowDataPacket {
	id: number;
	payee_id: number;
	recipient_id: number;
	amount: number;
	description?: string;
}

/**
 * Retrieves transactions made by a user.
 */
export async function getTransactionsByPayee(
	id: number,
): Promise<Transaction[]> {
	const [res] = await pool.execute<Transaction[]>(
		`SELECT T.payee_id, T.recipient_id, T.amount, T.description
        FROM transaction AS T
        INNER JOIN user AS U ON T.payee_id = U.id
        WHERE U.id = :id`,
		{ id },
	);
	return res;
}

/**
 * Retrieves transactions made to a user.
 */
export async function getTransactionsByRecipient(
	id: number,
): Promise<Transaction[]> {
	const [res] = await pool.execute<Transaction[]>(
		`SELECT CONCAT(U.first_name, U.last_name), T.payee_id, T.recipient_id, T.amount, T.description
        FROM transaction AS T
        INNER JOIN user AS U ON T.recipient_id = U.id
        WHERE U.id = :id`,
		{ id },
	);
	return res;
}

/**
 * Creates a new transaction with the given parameters.
 *
 * @returns id of newly created transaction
 */
export async function createTransaction(
	payee_id: number,
	recipient_id: number,
	amount: number,
	description?: string,
): Promise<number> {
	const [res] = await pool.execute<ResultSetHeader>(
		`INSERT INTO transaction (payee_id, recipient_id, amount, description)
		  VALUES (:payee_id, :recipient_id, :amount, :description)`,
		{ payee_id, recipient_id, amount, description },
	);
	return res.insertId;
}

/**
 * Update certain fields of a transaction with a given id.
 */
export async function updateTransaction(
	id: number,
	amount?: number,
	description?: string,
): Promise<void> {
	await pool.execute(
		`UPDATE transaction
        SET amount = :amount,
            description = :description
        WHERE id = :id`,
		{ amount, description, id },
	);
}

/**
 * Deletes transaction with given id.
 */
export async function deleteTransaction(id: number): Promise<void> {
	await pool.execute("DELETE FROM transaction WHERE id = :id", {
		id,
	});
}

interface Amount extends RowDataPacket {
	amount: number;
}

/**
 * Retrieves total transactions amount made by a user.
 */
export async function getBillByUserID(id: number): Promise<number> {
	const [[res, _]] = await pool.execute<ProcedureCallPacket<Amount[]>>(
		"CALL GetBillByUser(:id)",
		{ id },
	);

	if (res.length !== 1) {
		return 0;
	}

	return res[0].amount || 0;
}

/**
 * Retrieves total transactions amount to by a user.
 */
export async function getPaymentByUserID(id: number): Promise<number> {
	const [[res, _]] = await pool.execute<ProcedureCallPacket<Amount[]>>(
		"CALL GetPaymentByUser(:id)",
		{ id },
	);

	if (res.length !== 1) {
		return 0;
	}

	return res[0].amount || 0;
}

export async function getAllTransactions(): Promise<Transaction[]> {
	const [res] = await pool.execute<Transaction[]>(
		// "select * from transaction",
		`SELECT 
            t.id,           
            CONCAT(u1.first_name, ' ', u1.last_name) AS payee,    
            CONCAT(u2.first_name, ' ', u2.last_name) AS recipient,
            amount,        
            description
        FROM transaction AS t
            JOIN user AS u1
                ON t.payee_id = u1.id
            JOIN user AS u2
                ON t.recipient_id = u2.id`,
	);

	return res;
}
